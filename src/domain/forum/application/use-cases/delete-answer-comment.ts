import { Either } from './../../../../core/either'
import { left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answersCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answersCommentsRepository.findById(
      answerCommentId,
    )

    if (!answerComment) return left(new ResourceNotFoundError())

    if (answerComment.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.answersCommentsRepository.delete(answerComment)

    return right({})
  }
}
