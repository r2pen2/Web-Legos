export class MailManager {
  
  fromAddress: string;
  toAddress: string;
  fromPassword: string;

  constructor(fromAddress: string, fromPassword: string, toAddress: string) {
    this.fromAddress = fromAddress;
    this.fromPassword = fromPassword;
    this.toAddress = toAddress;
  }
  
  async sendMail(subject: string, text: string) {
    return new Promise<number>((resolve, reject) => {
      fetch(`/site-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fromAddress: this.fromAddress,
          toAddress: this.toAddress,
          fromPassword: this.fromPassword,
          text: text,
          subject: subject
        }),
      }).then(res => {
        resolve(res.status);
      });
    })
  }
}