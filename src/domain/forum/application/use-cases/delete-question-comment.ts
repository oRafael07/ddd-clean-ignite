import { Either, right } from '@/core/either'
import { QuestionsCommentsRepository } from '../repositories/questions-comments-respository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionsCommentsRepository.findById(
      questionCommentId,
    )

    if (!questionComment) return right(new ResourceNotFoundError())

    if (questionComment.authorId.toString() !== authorId)
      return right(new NotAllowedError())

    await this.questionsCommentsRepository.delete(questionComment)

    return right({})
  }
}
