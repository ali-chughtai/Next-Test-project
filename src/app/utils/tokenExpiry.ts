import jwt from "jsonwebtoken";

export default function isTokenExpired(token: string | null): boolean {
  try {
    if(!token){
        return true;
    }
    const decoded = jwt.decode(token) as { exp: number } | null;

    if (!decoded || !decoded.exp) {
      console.error("Invalid token");
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000); 
    return decoded.exp < currentTime; 
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; 
  }
}