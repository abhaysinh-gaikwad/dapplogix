const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.route');
const { blogRouter } = require('./routes/blog.route');
const { commentRouter } = require('./routes/comment.route');
const {cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

app.use(express.json(),cors());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
  );
app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/comments', commentRouter);




app.listen(process.env.PORT || 3000, async()=>{
    try{
        await connection;
        await cloudinaryConnect();
        console.log(`Connected to DB`);
        console.log(`Server is running on port ${process.env.PORT}`);
    }catch(err){
        console.log(err);
    }
})