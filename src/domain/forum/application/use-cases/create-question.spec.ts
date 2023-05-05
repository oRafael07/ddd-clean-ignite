import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async function (answer: Question): Promise<void> {},
}

test('Create an Answer', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionsRepository,
  )

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    content: 'Nova pergunta',
    title: 'Titulo',
  })

  expect(question.id).toBeTruthy()
})
