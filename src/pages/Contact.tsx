import FormTextField from "../components/FormTextField";

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
        </div>
    );
}
export default Contact;