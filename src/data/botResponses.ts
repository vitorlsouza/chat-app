export const botResponses = [
  'Olá! Como posso ajudar você hoje?',
  'Interessante! Me conte mais sobre isso.',
  'Entendi o que você está dizendo. Posso ajudar com mais alguma coisa?',
  'Que legal! Estou aqui para ajudar se precisar de mais informações.',
  'Obrigado por compartilhar isso comigo. Há algo mais que você gostaria de saber?',
  'Essa é uma ótima pergunta! Deixa eu pensar um pouco...',
  'Não tenho certeza sobre isso, mas posso tentar ajudar de outra forma.',
  'Que bom que você está interessado nesse assunto!',
  'Vou pesquisar mais sobre isso para te dar uma resposta melhor.',
  'Você tem razão! Isso é muito importante.',
  'Não tinha pensado nessa perspectiva antes. Obrigado por compartilhar!',
  'Estou aqui para ajudar no que precisar.',
  'Que interessante! Nunca tinha pensado nisso dessa forma.',
  'Vamos explorar esse assunto juntos?',
  'Você tem alguma outra dúvida sobre isso?',
  'Isso me faz pensar em várias possibilidades...',
  'Que bom que você está se informando sobre isso!',
  'Posso te ajudar a encontrar mais informações sobre esse assunto.',
  'Essa é uma ótima observação!',
  'Vamos continuar essa conversa interessante?',
]

export const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * botResponses.length)
  return botResponses[randomIndex]
}
