import "dotenv/config";

function getEnv(name:string):string{
    //is process.env an array why are we writing name within square brackets
    const value = process.env[name];
    
    if(!value)
        throw new Error(`missing env variable : ${name}`);
    return value;
}
// why use get env for the bottom three and not the other two
export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 5000),
    DATABASE_URL: getEnv("DATABASE_URL"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"), 
}