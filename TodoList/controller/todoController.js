const Todo=require('../model/todo')

const createTodo=async(req,res)=>{
    try{
        const {title,description,likes,dislikes,comments}=req.body
        
        if(!title || !description){
        console.log("Error While Creating TODO")
        return res.status(400).json({
            success:false,
            message:"Provide Both Fields"
        })}

        const response=await Todo.create({
            title:title,
            description:description,
            likes:likes || 0,
            dislikes:dislikes || 0,
            comments:comments || []
        })

        return res.status(200).json({
            success:true,
            data:response,
            message:"Entry Created Successfully",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const updateTodo=async(req,res)=>{
    try{
        const {id}=req.params
        const {title,description}=req.body

        if(!id || !title || !description){
            console.log("Error while Updating TODO")
            return res.status(400).json({
            success:false,
            message:"Provide All Fields"
        })}
        
        const newField=await Todo.findByIdAndUpdate(id,{
            title:title,
            description:description
        },{new:true})

        if(!newField){
            console.log("No Entry Found");
            return res.status(404).json({
                success:false,
                message:"No Entry with given ID Found"
            })
        }


        return res.status(200).json({
            success:true,
            data:newField,
            message:"Entry Updated Successfully",
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

const readAllTodo=async(req,res)=>{
    try{
        const todo=await Todo.find()

        if(todo.length===0){
            console.log("No Entry Found");
            return res.status(200).json({
                success: true,
                data: [],
                message: "No todos found"
            });
        }

        return res.status(200).json({
            success:true,
            data:todo,
            message:"Entry Provided Successfully",
        })
        
    }catch(err){
       return res.status(500).json({
            success:false,
            message:"Server Error"
        }) 
    }
}

const readTodo=async(req,res)=>{
    try{
        const {id}=req.params
        
        if(!id){
            console.log("Error while Reading TODO")
            return res.status(400).json({
            success:false,
            message:"Provide ID Fields"
        })}

        const todo=await Todo.findById(id)

        if(!todo){
            console.log("No Entry Found");
            return res.status(404).json({
                success:false,
                message:"No Entry with given ID Found"
            })
        }

        return res.status(200).json({
            success:true,
            data:todo,
            message:"Entry Provided Successfully",
        })
        
    }catch(err){
       return res.status(500).json({
            success:false,
            message:"Server Error"
        }) 
    }
}

const deleteTodo=async(req,res)=>{
    try{
        const {id}=req.params
        
        if(!id){
            console.log("Error while Reading TODO")
            return res.status(400).json({
            success:false,
            message:"Provide ID Fields"
        })}

        const todo=await Todo.findByIdAndDelete(id)

        if(!todo){
            console.log("No Entry Found");
            return res.status(404).json({
                success:false,
                message:"No Entry with given ID Found"
            })
        }

        return res.status(200).json({
            success:true,
            data:todo,
            message:"Entry Provided Successfully",
        })
        
    }catch(err){
       return res.status(500).json({
            success:false,
            message:"Server Error"
        }) 
    }
}

const likeTodo=async(req,res)=>{
    try{
        const {id}=req.params
        
        if(!id){
            console.log("Error while Liking TODO")
            return res.status(400).json({
            success:false,
            message:"Provide ID Fields"
        })} 

        const todo=await Todo.findByIdAndUpdate(id,
            {$inc:{likes:1}},
            {new:true}
        )

        if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        });
        }
        res.status(200).json({
            success: true,
            data: todo,
            message: "Liked successfully"
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

const dislikeTodo=async(req,res)=>{
    try{
        const {id}=req.params
        
        if(!id){
            console.log("Error while Disliking TODO")
            return res.status(400).json({
            success:false,
            message:"Provide ID Fields"
        })} 

        const todo=await Todo.findByIdAndUpdate(id,
            {$inc:{dislikes:1}},
            {new:true}
        )

        if (!todo) {
        return res.status(404).json({
        success: false,
        message: "Todo not found"
        });
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: "Disliked successfully"
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

const addComment=async(req,res)=>{
    try{
    const {id}=req.params
    const {comments}=req.body
    
    if(!id || !comments){
        return res.status(400).json({
            success:false,
            message:"Fields must be filled"
        })
    }

    const todo=await Todo.findByIdAndUpdate(id,
        {$push:{comments:{text:comments}}},
        {new:true}
    )

    if(!todo){
        return res.status(404).json({
            success:false,
            message:"No Field with given ID"
        })
    }

    return res.status(200).json({
        success:true,
        message:"Comment Added Successfully",
        data:todo
    })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

const updateComment=async(req,res)=>{
    try{
        const {id}=req.params
        const {comments}=req.body
        
        if(!comments){
            return res.status(400).json({
                success:false,
                message:"Comment Field Empty"
            })
        }

        const todo=await Todo.findByIdAndUpdate(id,{
            $set:{comments:comments}
        },
        {new:true})

        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Comment Updated Successfully",
            data:todo
        })  

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

const removeLike = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndUpdate(
            id,
            { $inc: { likes: -1 } },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: todo,
            message: "Like removed"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const removeDislike = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndUpdate(
            id,
            { $inc: { dislikes: -1 } },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: todo,
            message: "Like removed"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};``

module.exports={createTodo,updateTodo,readTodo,readAllTodo,deleteTodo,likeTodo,dislikeTodo,addComment,updateComment,removeLike,removeDislike}