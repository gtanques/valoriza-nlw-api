import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository"
import { TagRepository } from "../repositories/TagRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {

        const complimentRepository = getCustomRepository(ComplimentRepository);
        const userRepository = getCustomRepository(UserRepository);
        const tagRepository = getCustomRepository(TagRepository);

        const tagExists = await tagRepository.findOne(tag_id);

        const userReceiverExists = await userRepository.findOne(user_receiver);

        if (user_sender === user_receiver) {
            throw new Error("Incorrect user receiver!");
        }

        if (!tagExists) {
            throw new Error("tag does not exists!");
        }

        if (!userReceiverExists) {
            throw new Error("User receiver does not exists!");
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService }