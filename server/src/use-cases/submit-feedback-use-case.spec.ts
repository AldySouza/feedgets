import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base6412312eqwe12e1we12e',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit without type', async () => {
    await expect(submitFeedback.execute({
      type:'',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base6412312eqwe12e1we12e',
    })).rejects.toThrow();
  });

  it('should not be able to submit without comment', async () => {
    await expect(submitFeedback.execute({
      type:'BUG',
      comment: '',
      screenshot: 'data:image/png;base6412312eqwe12e1we12e',
    })).rejects.toThrow();
  });

  it('should not be able to submit with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type:'BUG',
      comment: 'tá tudo bugado',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
})