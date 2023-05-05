import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = void

export class DeleteAnswerUseCase {
  constructor(private readonly answerRepository: AnswersRepository) {}
  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('Question not found')

    if (authorId !== answer.authorId.toString()) throw new Error('Not allowed.')

    await this.answerRepository.delete(answer)
  }
}
