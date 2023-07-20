import { QuestionsCommentsRepository } from '../repositories/questions-comments-respository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = void

export class DeleteQuestionUseCase {
  constructor(
    private readonly questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsCommentsRepository.findById(questionId)

    if (!question) throw new Error('Question not found')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed.')

    await this.questionsCommentsRepository.delete(question)
  }
}
