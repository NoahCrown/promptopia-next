import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'; // Import your Mongoose model
import User from '@models/user'

export const POST = async (req, res) => {
    const { searchText } = await req.json();
    console.log(searchText);

    try {
        await connectToDB();
        
        if (searchText === '') {
            try {
                const prompts = await Prompt.find({}).populate('creator');
                return new Response(JSON.stringify(prompts), {status: 200});
            } catch (error) {
                console.error("Failed to fetch all prompts:", error);
                return new Response('Failed to fetch all prompts', {status:500});
            }
        }

        // const searchResultUser = await User.findOne({
        //     username: searchText
        // }, '_id')
        const searchResultTags = await Prompt.find({
            tag: searchText    
        })
        .populate('creator')

        return new Response(JSON.stringify(searchResultTags), { status: 200 });
    
    } catch (error) {
        console.error("Failed to fetch prompts:", error);
        return new Response('Failed to fetch prompts', { status: 500 });
    }
};
