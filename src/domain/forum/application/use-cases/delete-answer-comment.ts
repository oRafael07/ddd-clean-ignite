import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answersCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment = await this.answersCommentsRepository.findById(
      answerCommentId,
    )

    if (!answerComment) throw new Error('Answer Comment not found')

    if (answerComment.authorId.toString() !== authorId)
      throw new Error('Not allowed')

    await this.answersCommentsRepository.delete(answerComment)
  }
}
