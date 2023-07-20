import { QuestionsCommentsRepository } from '../repositories/questions-comments-respository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment = await this.questionsCommentsRepository.findById(
      questionCommentId,
    )

    if (!questionComment) throw new Error('Question Comment not found')

    if (questionComment.authorId.toString() !== authorId)
      throw new Error('Not allowed')

    await this.questionsCommentsRepository.delete(questionComment)
  }
}
