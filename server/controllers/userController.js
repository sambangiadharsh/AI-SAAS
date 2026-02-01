import sql from "../config/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
        const creations = await sql`
      SELECT *
      FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
      const totalResult = await sql`
      SELECT COUNT(*) 
      FROM creations 
      WHERE user_id = ${userId}
    `;

    const total = Number(totalResult[0].count);
       res.json({
      success: true,
      creations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + creations.length < total
      }
    });
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
