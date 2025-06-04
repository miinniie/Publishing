
$(document).ready(function () {
  initStep1();
  initStep2();
  initStep3();
  initStep4();
});

/** STEP 1: 이름 */
function initStep1() {
  const $input = $('#name-input');
  const $box = $('#name-box');
  const $btn = $box.find('.request-btn');

  $input.on('input', () => {
    const hasValue = $input.val().trim().length > 0;
    $btn.toggleClass('active', hasValue);
  });

  $btn.on('click', () => {
    if (!$btn.hasClass('active')) return;
    transitionFocusBox('#jumin-box', '#jumin-input');
  });
}

/** STEP 2: 주민등록번호 */
function initStep2() {
  const $input = $('#jumin-input');
  const $box = $('#jumin-box');

  $input.on('input', () => {
    let val = $input.val().replace(/[^0-9]/g, '').slice(0, 13);
    if (val.length > 6) val = val.slice(0, 6) + '-' + val.slice(6);
    $input.val(val);

    if (val.length === 14) {
      transitionFocusBox('#phone-box', '#phone-input');
    }
  });
}

/** STEP 3: 휴대폰번호 */
function initStep3() {
  const $carrierBtn = $('#carrier-btn');
  const $input = $('#phone-input');
  const $btn = $('#phone-box').find('.request-btn');

  $carrierBtn.on('click', () => {
    const selected = prompt('통신사를 입력하세요 (예: SKT, KT, LGU+)');
    if (selected) {
      $carrierBtn.find('span').text(selected);
    }
  });

  $input.on('input', () => {
    let val = $input.val().replace(/[^0-9]/g, '').slice(0, 11);
    if (val.length >= 10) {
      val = val.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    }
    $input.val(val);

    const isValid = /^010-\d{4}-\d{4}$/.test(val);
    $btn.toggleClass('active', isValid);
  });

  $btn.on('click', () => {
    if (!$btn.hasClass('active')) return;

    showToast('인증번호가 전송됐어요', 'success', {
      bottom:100,
      paddingX:20,
    });
    transitionFocusBox('#num-box', '#num-input');
    startAuthCountdown();
  });
}

/** STEP 4: 인증번호 */
function initStep4() {
  const $input = $('#num-input');
  const $confirmBtn = $('.confirm-btn');
  const $resendBtn = $('#num-box .request-btn');

  $input.on('input', () => {
    const code = $input.val().replace(/[^0-9]/g, '').slice(0, 6);
    $input.val(code);
    $confirmBtn.toggleClass('active', code.length === 6);
  });

  $resendBtn.on('click', () => {
    if (!$resendBtn.hasClass('active')) return;

    showToast('인증번호가 전송됐어요', 'success', {
      bottom:100,
      paddingX:20,
    });
    startAuthCountdown();
  });
}

/** 타이머 */
let authTimer = null;
function startAuthCountdown() {
  const $timer = $('#num-box .input-timer');
  const $resend = $('#num-box .request-btn');

  clearInterval(authTimer);
  $resend.removeClass('active');

  let time = 180;
  updateTime();

  authTimer = setInterval(() => {
    time--;
    updateTime();

    if (time <= 0) {
      clearInterval(authTimer);
      $resend.addClass('active');
      $timer.text('00:00');
    }
  }, 1000);

  function updateTime() {
    const m = String(Math.floor(time / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    $timer.text(`${m}:${s}`);
  }
}

/** 다음 단계 */
function transitionFocusBox(nextBoxId, nextInputId) {
  $('.input-box').removeClass('focus');
  $(nextBoxId).addClass('on focus');
  $(nextInputId).focus();
}

/**
 * 공통: toast
 * @param {string} msg - 표시할 메시지 텍스트
 * @param {string} [type='success'] - 토스트 타입 ('success' | 'error'), 아이콘
 * @param {object} [options] - 위치 및 스타일 설정을 위한 옵션
 * @param {number} [options.bottom=120] - 토스트의 하단 여백 (px)
 * @param {number} [options.paddingX=20] - 좌우(x축) 여백
 */
function showToast(msg, type = 'success', options = {}) {
  const {
    bottom = 120,
    paddingX = 20,
  } = options;

  $('.toast').remove();

  const iconMap = {
    success: './assets/img/icon_toast_check.png',
    error: './assets/img/icon_toast_error.png',
  };

  const $toast = $(`
    <div class="toast">
      <div class="toast-box">
        <img class="toast-icon" src="${iconMap[type] || iconMap.success}" alt="">
        <span class="toast-msg">${msg}</span>
      </div>
    </div>
  `).css({
    bottom: `${bottom}px`,
    width: `calc(100% - ${paddingX * 2}px)`,
  });
  $('body').append($toast);
  
  $toast.fadeIn(200);
  setTimeout(() => {
    $toast.fadeOut(200, () => $toast.remove());
  }, 2400);
}