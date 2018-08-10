var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 3000;
} else if (env === "test") {
  process.env.PORT = 3000;
} else if (env === "production") {
  process.env.MONGODB_URI =
  "mongodb://thakursaurabh1998:helloworld123@ds131531.mlab.com:31531/todoapp";
}