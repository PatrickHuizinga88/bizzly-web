import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { z } from 'astro:schema';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email()
    }),
    handler: async ({email}) => {
      const { data, error } = await resend.emails.send({
        from: 'Bizzly <hello@bizzly.nl>',
        to: email,
        replyTo: 'support@bizzly.nl',
        subject: 'Bevestiging Bizzly',
        html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <tr>
          <td style="text-align: center; padding-bottom: 30px;">
            <img src="https://bizzly.nl/logo.svg" alt="Bizzly" width="120" height="40" style="display: block; margin: 0 auto;" />
          </td>
        </tr>
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <h1 style="font-size: 28px; margin: 0; color: #111827;">Welkom bij <span style="color: #1860fb;">Bizzly</span> 👋</h1>
            </td>
          </tr>
          <tr>
            <td style="font-size: 16px; line-height: 1.6;">
              <p>Hi,</p>
    
              <p>Erg bedankt voor je interesse in Bizzly!</p>
    
              <p>
                <strong>Bizzly</strong> wordt een slimme assistent voor zelfstandige ondernemers. Geen vaag AI-tooltje, maar een hulpje dat écht meedenkt met o.a. vragen over marketing, boekhouden en bedrijfsvoering.
              </p>
    
              <p>Jij staat nu op de lijst en krijgt als eerste updates over onze ontwikkeling én vroege toegang zodra we live gaan.</p>
    
              <p>Heb je ideeën, feedback of wil je meedenken? Reageer gerust op deze mail. We bouwen Bizzly graag samen met jou.</p>
    
              <p>
              Groet,<br /><br />
              <strong>Patrick Huizinga</strong><br />
              Oprichter van Bizzly
              </p>
            </td>
          </tr>
        </table>
        `,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: '8b627ec7-0116-40e5-aa70-46d079433d12',
      });

      return data;
    },
  }),
};