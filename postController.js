import PostModel from "../models/post.js";

export const getOne = async (req, res) => {
    try{ 
        const postId = await req.params.id;

        const updatedPost = await PostModel.findByIdAndUpdate(
            {_id: postId,},
            {$inc: {viewsCount: 1},},
            {new: true}
        );
            if (!updatedPost) {
                return res.status(404).json({ message: "No article was found" });
            }
        
            res.json(updatedPost);
            } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Couldn't find the article" });
            }
};

export const getAll = async (req, res) => {
    try{ 
        const posts = await PostModel.find().populate({ path: "user", select: ["nickName", "avatar"] }).exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось просмотреть публикации'
        })
    }
};

export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create a post'
        })
    }
};

export const remove = async (req, res) => {
    try{ 
        const postId = await req.params.id;

        const deletedPost = await PostModel.findByIdAndDelete(
            {_id: postId,},
        );
            if (!deletedPost) {
                return res.status(404).json({ message: "No article was found" });
            }
        
            res.json({
                succes: true
            });
            } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Couldn't find the article" });
            }
};

export const update = async (req, res) => {
    try {
        const postId = await req.params.id;

        const updatePost = await PostModel.findByIdAndUpdate(
            {_id: postId,},
            {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
            },
        );
        res.json(updatePost);
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'article could not be updated'
        })
    }
};