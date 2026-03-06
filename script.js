function toggleMode() {
    const body = document.getElementById('mainBody');
    body.classList.toggle('register-mode');
    body.classList.toggle('edit-mode');
}

// 各要素の取得
const idInput = document.getElementById('idInput');
const idFieldset = document.getElementById('idFieldset');
const idError = document.getElementById('idError');

const linkInput = document.getElementById('linkInput');
const linkFieldset = document.getElementById('linkFieldset');
const linkError = document.getElementById('linkError');

const passInput = document.getElementById('passInput');
const passFieldset = document.getElementById('passFieldset');
const passError = document.getElementById('passError');

function handleSubmit() {
    const id = document.getElementById('idInput').value;
    const link = document.getElementById('linkInput').value;
    const pass = document.getElementById('passInput').value;

    // 判定ロジック
    if (id && link && pass) {
        alert(`登録・保存しました！\nID: ${id}`);
    } else {
        alert("全部入力してね！");
    }
}

// --- 1. 入力欄から離れた（Blur）時の判定 ---
idInput.addEventListener('blur', function() {
    const idValue = idInput.value.trim();
    const usedIDs = ["admin", "tamaki", "test"];

    if (idValue === "") {
        // 空のまま離れたら赤くする
        showIndivError("IDを入力してください");
    } else if (usedIDs.includes(idValue)) {
        // 重複してたら赤くする
        showIndivError("このIDはもう使われています");
    } else {
        // 合格ならエラーを消す
        resetError();
    }
});

// --- 2. 再入力しようとした（Focus）時の処理 ---
idInput.addEventListener('focus', function() {
    // 入力を始めたら、一時的にエラー（赤枠）を解除してあげる
    // これで「せかされてる感」がなくなります！
    idFieldset.classList.remove('error-border');
    // エラー文は残しておいてもいいし、消してもいい（今回は枠だけ戻す設定）
});

// すべての入力欄に対して、フォーカス時の動きを設定
[idInput, linkInput, passInput].forEach(input => {
    input.addEventListener('focus', function() {
        // 親要素の fieldset からエラーのクラスを消す
        const fieldset = this.parentElement;
        fieldset.classList.remove('error-border');
        
        // エラー文も一緒に隠したい場合はこれも追加
        const errorMsg = fieldset.querySelector('.error-text');
        if (errorMsg) errorMsg.classList.add('hidden');
    });
});

// エラー表示・リセットの共通関数
function showIndivError(message) {
    idFieldset.classList.add('error-border');
    idError.textContent = message;
    idError.classList.remove('hidden');
}

function resetError() {
    idFieldset.classList.remove('error-border');
    idError.classList.add('hidden');
}

// --- Link入力欄から離れた（Blur）時の判定 ---
linkInput.addEventListener('blur', function() {
    const linkValue = linkInput.value.trim();

    // 判定開始
    if (linkValue === "") {
        // 空の時
        showLinkError("リンクを入力してください");
    } else if (!linkValue.startsWith("http://") && !linkValue.startsWith("https://")) {
        // http:// も https:// も入っていない時
        showLinkError("正しいリンクをご入力ください");
    } else {
        // 合格！
        resetLinkError();
    }
});

// 再入力しようとした（Focus）時は赤枠を消してあげる
linkInput.addEventListener('focus', function() {
    linkFieldset.classList.remove('error-border');
});

// --- Link専用のエラー表示・リセット関数 ---
function showLinkError(message) {
    linkFieldset.classList.add('error-border');
    linkError.textContent = message;
    linkError.classList.remove('hidden');
}

function resetLinkError() {
    linkFieldset.classList.remove('error-border');
    linkError.classList.add('hidden');
}

passInput.addEventListener('blur', function() {
    const val = passInput.value;
    // 英字と数字を両方含むかチェックする魔法の言葉
    const hasAlphaNum = /(?=.*[a-zA-Z])(?=.*\d)/.test(val);

    if (val.length < 8 || !hasAlphaNum) {
        passFieldset.classList.add('error-border');
        // メッセージはHTMLの要素に合わせて書き換えてね
    } else {
        passFieldset.classList.remove('error-border');
    }
});

// パスワード表示切替の機能
document.getElementById('showPass').addEventListener('change', function() {
    passInput.type = this.checked ? 'text' : 'password';
});

function showError(f, e, m) {
    f.classList.add('error-border');
    e.textContent = m;
    e.classList.remove('hidden');
}

function hideError(f, e) {
    f.classList.remove('error-border');
    e.classList.add('hidden');
}

function handleSubmit() {
    // 最終チェック：エラーがあるか、空欄があるか
    const hasError = document.querySelector('.error-border');
    if (!hasError && idInput.value && linkInput.value && passInput.value) {
        alert("保存しました！");
    } else {
        alert("入力内容を確認してください");
    }
}