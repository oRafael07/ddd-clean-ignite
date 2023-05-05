import { AnswersRepository } from './../repositories/answers-repository';
import { Answer } from "../entities/answer"
import { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}
  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content
    })

    await this.answersRepository.create(answer)

    return answer
  }
}