import { createApp, nextTick } from 'vue';
import { styled } from "@styils/vue"

const MessageModel = styled('div', {
    margin: '5px',
    padding: '10px 16px 10px 16px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 'fit-content',
    fontWeight: 'bold',
    borderRadius: "5px",
})

const messageColorInfo = {
    color: 'white',
    background: '#7a7374',
}
const messageColorSuccess = {
    color: 'white',
    background: '#1ba784',
}
const messageColorWarning = {
    color: 'white',
    background: '#fba414',
}
const messageColorError = {
    color: 'white',
    background: '#ee3f4d',
}

const MessageBox = {
    props: {
        form: {
            type: String,
            required: true,
            default: 'info'
        },
        msg: {
            type: String,
            required: true,
        }
    },
    render(ctx) {
        const { $props, $emit } = ctx;
        if ($props.form === "success") {
            return (
                <MessageModel style={messageColorSuccess} class={"message-model"}>
                    {$props.msg}
                </MessageModel>
            );
        } else if ($props.form === "warning") {
            return (
                <MessageModel style={messageColorWarning} class={"message-model"}>
                    {$props.msg}
                </MessageModel>
            );
        } else if ($props.form === "error") {
            return (
                <MessageModel style={messageColorError} class={"message-model"}>
                    {$props.msg}
                </MessageModel>
            );
        } else {
            return (
                <MessageModel style={messageColorInfo} class={"message-model"}>
                    {$props.msg}
                </MessageModel>
            );
        }
    }
}
export function useMessage(form, msg) {
    if (msg === undefined) {
        if (form === "success") {
            msg = "成功";
        } else if (form === "warning") {
            msg = "警告";
        } else if (form === "error") {
            msg = "错误";
        } else {
            msg = "默认内容";
        }
    }
    const outermostDiv = document.querySelector('#message-frame');
    const div = document.createElement('div');
    div.style.opacity = "0";
    div.style.transform = "translateY(-20px)";
    div.style.transition = 'all 0.5s ease';
    outermostDiv.appendChild(div);
    const app = createApp(MessageBox, {
        form,
        msg
    });
    app.mount(div);

    setTimeout(() => {
        div.style.opacity = "0.6";
        div.style.transform = "translateY(0px)";
    }, 100);

    setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = "translateY(-20px)";
        setTimeout(() => {
            app.unmount(div);
            nextTick(() => {
                outermostDiv.removeChild(div);
            });
        }, 500);
    }, 3000);
}