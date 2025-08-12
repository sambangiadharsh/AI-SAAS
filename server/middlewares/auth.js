import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId ,has} = req.auth(); // from @clerk/express

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch user data
    const user = await clerkClient.users.getUser(userId);

    const hasPremiumPlan = await has({plan:'premium'});
  
    if (!hasPremiumPlan && user.privateMetadata?.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      // Reset free_usage in Clerk
      await clerkClient.users.updateUser(userId, {
        privateMetadata: { free_usage: 0 }
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
