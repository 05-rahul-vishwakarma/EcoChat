import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    messages: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        default: []
    },
    isGroup:{
     type:Boolean,
     default:false, 
    },
    groupName: {
        type: "String",
        default: "",
    },
    groupPhoto: {
        type: "String",
        default: "",
    },
    lastMessage: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Chats = mongoose?.models?.Chats || mongoose.model('Chats', ChatSchema);
export default Chats;

// const User = mongoose.models.User || mongoose.model('User', UserSchema);
// export default User;