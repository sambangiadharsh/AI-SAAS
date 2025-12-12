import OpenAI from "openai";
import { clerkClient } from "@clerk/express";
import sql from "../config/db.js"; 
import axios from "axios";
import FormData from "form-data";
import fs from 'fs/promises';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import cloudinary from "../config/cloudinary.js";


const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});


// // Configure OpenAI client for Gemini endpoint
// const openai = new OpenAI({
//   apiKey: process.env.GEMINI_API_KEY,
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
// });


//Generate article
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length, type } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free limit reached. Upgrade to premium."
      });
    }

    // Generate article using OpenRouter FREE MODEL
    const response = await openrouter.chat.completions.create({
      model: "meta-llama/llama-3.2-1b-instruct",
      messages: [
        {
          role: "user",
          content: `${prompt}. Write an article of around ${length} words.`
        }
      ]
    });

    const article = response.choices[0].message.content;

    // Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish, likes, created_at, updated_at)
      VALUES (${userId}, ${prompt}, ${article}, ${type || "article"}, false, '{}', NOW(), NOW())
    `;

    // Update free usage
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 }
      });
    }

    res.json({ success: true, content: article });

  } catch (error) {
    console.error("ARTICLE ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Blog titles

export const blogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();  // FIXED
    const { prompt, category } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free limit reached. Upgrade to premium.",
      });
    }

    // Use working FREE model
    const completion = await openrouter.chat.completions.create({
      model: "meta-llama/llama-3.2-1b-instruct",
      messages: [
        {
          role: "user",
          content: `${prompt} — Give me 5 creative blog titles.`,
        },
      ],
    });

    const article = completion.choices[0].message.content;

    // Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish, likes, created_at, updated_at) 
      VALUES (
        ${userId}, 
        ${prompt}, 
        ${article}, 
        ${category || "blog title"}, 
        false, 
        '{}', 
        NOW(), 
        NOW()
      )
    `;

    // Update free usage count
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content: article,
    });
  } catch (error) {
    console.error("Error generating article:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//Generate images
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, imagestyle } = req.body;

    const plan = req.plan;
  
    

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Free limit reached. Upgrade to premium."
      });
    }

    // Prepare form-data for ClipDrop API(only form date is allowed by clipdrop api)
    const form = new FormData();
    form.append("prompt", `${prompt}, style: ${imagestyle}`);

    // Request image from ClipDrop
    const clipdropResponse = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY
        },
        responseType: "arraybuffer"
      }
    );

    // Convert binary image to Base64 with MIME type
   const base64ImageData = Buffer.from(clipdropResponse.data, "binary").toString("base64");

const uploadResult = await cloudinary.uploader.upload(`data:image/png;base64,${base64ImageData}`, {
  folder: "ai_generated_images",
});

    const imageUrl = uploadResult.secure_url;

    // Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish, likes, created_at, updated_at) 
      VALUES (
        ${userId}, 
        ${prompt}, 
        ${imageUrl}, 
        ${"image"}, 
        false, 
        '{}', 
        NOW(), 
        NOW()
      )
    `;

    

    res.json({
      success: true,
      content: imageUrl
    });
  }catch (error) {
  if (error.response && error.response.data) {
    // If data is a buffer, try to parse as JSON string
    const errorMsg =
      Buffer.isBuffer(error.response.data)
        ? error.response.data.toString("utf8")
        : JSON.stringify(error.response.data);

    console.error("ClipDrop API error response:", errorMsg);
  } else {
    console.error("Error generating image:", error.message);
  }
  res.status(500).json({ success: false, message: "Server error" });
}
};


//Remove background

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();  
    const image  = req.file;    
    const plan = req.plan;          

    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions"
      });
    }

    //Cloudinary ai take care
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: 'background_removal',
          background_removal: 'cloudinary_ai'  // use Cloudinary AI background removal
        }
      ]
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish, likes, created_at, updated_at) 
      VALUES (
        ${userId}, 
        'remove background from image', 
        ${secure_url}, 
        ${"image"}, 
        false, 
        '{}', 
        NOW(), 
        NOW()
      )
    `;

    res.json({
      success: true,
      content: secure_url
    });

  } catch (error) {
    console.error("Error removing background:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//Remove object from image 
export const removeObjectFromImage = async (req, res) => {
  try {
    const { userId } = req.auth(); 
    const image = req.file;       
    const { object } = req.body;     
    const plan = req.plan;          

    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions"
      });
    }

    if (!image) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Upload the original image to Cloudinary (no transformation here)
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      resource_type: 'image',
    });
    const public_id = uploadResult.public_id;

    // Generate transformed URL with gen_remove effect to remove the object
    // You can add the object name in context if needed, but transformation only uses effect here
    const transformedUrl = cloudinary.url(public_id, {
      transformation: [
        { effect: `gen_remove:${object}` }
 
      ],
      resource_type: 'image',
      format: 'png',   
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish, likes, created_at, updated_at) 
      VALUES (
        ${userId}, 
        ${`remove ${object} from image`}, 
        ${transformedUrl}, 
        ${"image"}, 
        false, 
        '{}', 
        NOW(), 
        NOW()
      )
    `;

    res.json({
      success: true,
      content: transformedUrl
    });

  } catch (error) {
    console.error("Error removing object:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



//Resume review 




export const resumeReview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No resume file uploaded" });
    }

    const { userId } = req.auth();
    const resume = req.file;

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Please upload a resume smaller than 5MB"
      });
    }

    // Read PDF  
    const pdfBuffer = await fs.readFile(req.file.path);

    const data = await pdf(pdfBuffer);
    const resumeText = data.text || "No text could be extracted.";

    const prompt = `
      You are a professional resume reviewer.
      Analyze the resume below and provide:
      ✔ Strengths  
      ✔ Weaknesses  
      ✔ Suggestions for improvement  
      ✔ ATS score improvement tips  
      ✔ Formatting suggestions  

      Resume Content:
      ${resumeText}
    `;

    // 🟢 Use OpenRouter with working free model
    const completion = await openrouter.chat.completions.create({
      model: "meta-llama/llama-3.2-1b-instruct",
      messages: [{ role: "user", content: prompt }]
    });

    await fs.unlink(resume.path); // remove temp file

    const review = completion.choices?.[0]?.message?.content || "No review generated.";

    // Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish, likes, created_at, updated_at)
      VALUES (${userId}, 'resume review', ${review}, 'review resume', false, '{}', NOW(), NOW())
    `;

    res.json({ success: true, content: review });

  } catch (error) {
    console.error("Error in resume review:", error);
    res.status(500).json({
      success: false,
      message: "Server error during resume review"
    });
  }
};