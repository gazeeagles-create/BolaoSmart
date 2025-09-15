// backend/src/controllers/webhookController.js

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const { supabase } = require('../supabaseClient'); // Importando o cliente Supabase
const router = express.Router();

// Usando bodyParser para processar webhooks do Stripe
router.use(bodyParser.raw({ type: 'application/json' }));

// O endpoint do Stripe Webhook
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Sua chave secreta do webhook

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('Erro ao verificar a assinatura do webhook:', err);
    return res.status(400).send(`Erro no Webhook: ${err.message}`);
  }

  // Processando o evento do webhook
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object; // O objeto da sessão do Stripe

      // Registrar o pagamento no Supabase
      const { usuario_id, bolao_id, valor, id } = session;

      try {
        const { data, error } = await supabase
          .from('pagamento')
          .insert([
            {
              usuario_id,
              bolao_id,
              valor: session.amount_total,  // Valor pago (em centavos)
              status: 'succeeded',  // Status do pagamento
              stripe_session_id: id,
            },
          ]);

        if (error) {
          console.log('Erro ao registrar pagamento no Supabase:', error);
          return res.status(500).send('Erro ao salvar pagamento no banco de dados');
        }

        console.log('Pagamento registrado com sucesso no Supabase:', data);
      } catch (err) {
        console.error('Erro ao registrar pagamento no Supabase:', err);
        return res.status(500).send('Erro ao salvar pagamento');
      }

      break;

    case 'checkout.session.async_payment_failed':
      const failedSession = event.data.object; // O objeto da sessão falhada
      console.log(`Pagamento falhou para a sessão ${failedSession.id}`);
      // Registrar como falha no Supabase, se necessário
      break;

    default:
      console.log(`Evento não tratado: ${event.type}`);
  }

  // Respondendo com sucesso
  res.status(200).send('Webhook recebido com sucesso');
});

module.exports = router;
