import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-respository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete answer', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    inMemoryAnswersRepository.create(answer)

    await sut.execute({ authorId: 'author-1', answerId: 'answer-1' })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete answer from another user', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    inMemoryAnswersRepository.create(answer)

    await expect(() =>
      sut.execute({ authorId: 'author-2', answerId: 'answer-1' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
