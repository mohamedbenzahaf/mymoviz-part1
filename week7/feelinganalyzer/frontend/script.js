
const messageInput = document.getElementById('message');
const feeling = document.getElementById('feeling');
const sentimentImage = document.getElementById('sentiment');
const scoreElement = document.getElementById('score');

messageInput.addEventListener('input', async () => {
  const message = messageInput.value;

  if (message.trim() === '') {
    document.body.style.backgroundColor = '#FFFFFF';
    feeling.textContent = '';
    sentimentImage.src = 'images/question-mark.png';
    scoreElement.textContent = '0';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!data.result) {
      return;
    }

    scoreElement.textContent = data.score;

    if (data.score < 0) {
      document.body.style.backgroundColor = '#EC7C89';
      feeling.textContent = 'ANGRY';
      sentimentImage.src = 'images/angry.png';
    } else if (data.score > 0) {
      document.body.style.backgroundColor = '#F5DA7D';
      feeling.textContent = 'HAPPY';
      sentimentImage.src = 'images/happy.png';
    } else {
      document.body.style.backgroundColor = '#82C0CC';
      feeling.textContent = 'NEUTRAL';
      sentimentImage.src = 'images/neutral.png';
    }
  } catch (error) {
    console.error('Erreur lors de l’analyse du sentiment :', error);
  }
});

