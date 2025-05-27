import FormTextField from "@/components/FormTextField";
import AlertDialog from "@/components/Dialog";

function Contact() {
    return (
        <div>
            <h2>お問い合わせページです</h2>
            <FormTextField
                error
                id="filled-error-helper-text"
                label="苗字"
                defaultValue="田中"
                variant="filled"
            />
            <FormTextField
                error
                id="filled-error-helper-text"
                label="名前"
                defaultValue="太郎"
                variant="filled"
            />
            <AlertDialog
                triggerLabel="送信"
                dialogTitle="送信しますか？"
                dialogDescription="契約内容に同意の上、送信してください。"
                cancelLabel="キャンセル"
                confirmLabel="送信"
            />
        </div>
    );
}
export default Contact;