/* A oferta é liberada apenas após o vídeo VTurb alcançar 10:00.
   Nenhum dado é enviado a serviços de rastreamento. */
(() => {
  'use strict';
  const LIMITE_SEGUNDOS = 600;
  const player = document.getElementById('vid-6ace6f80f6a57d8e37bbdaa6');
  if (!player) return;

  let liberada = false;
  const liberarOferta = () => {
    if (liberada) return;
    liberada = true;
    document.querySelectorAll('section[data-oferta-vturb="oculta"]').forEach((section) => {
      section.removeAttribute('data-oferta-vturb');
    });
  };

  // Evento nativo da API VTurb: detail.time contém a posição do vídeo em segundos.
  // Usa o tempo do VÍDEO, nunca tempo de permanência na página.
  player.addEventListener('video:timeupdate', (event) => {
    const posicao = Number(event.detail && event.detail.time);
    if (Number.isFinite(posicao) && posicao >= LIMITE_SEGUNDOS) {
      liberarOferta();
    }
  });
})();
