import sql from "../config/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleLikeCreations = async (req, res) => {
  try {
    const { userId } = req.auth();    
    const { id } = req.body();        
    const creations = await sql`SELECT * from creations WHERE user_id=${id} ORDER BY created_at DESC`; 

    if (!creations) {
      return req.json({ success: false, message: "creations not found" });  
    }

    const currentLikes = creations.likes;   
    const userIdStr = userId.toString();

    let updatedlikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
     
      updatedlikes = currentLikes.filter((user) => user != userIdStr);
      message = 'creation unliked';
    } else {
      
      updatedlikes = [...currentLikes, userIdStr];   // you have typo userIdstr => userIdStr
      message = 'creation liked';
    }

    const formattedarray = `{${updatedlikes.join(',')}}`;

    await sql`update creations SET likes=${formattedarray}::text[] where id=${id}`;

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
