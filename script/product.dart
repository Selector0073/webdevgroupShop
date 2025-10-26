import 'dart:html';

void main() {
  FormElement sendForm = querySelector('#send-form') as FormElement;
  DivElement output = querySelector('#output') as DivElement;

  sendForm.onSubmit.listen((Event event) {
    event.preventDefault();

    String email = (sendForm.querySelector('#exampleInputEmail1') as InputElement).value ?? '';

    String Password = (sendForm.querySelector('#exampleInputPassword1') as InputElement).value ?? '';
    String PasswordCheck = (sendForm.querySelector('#exampleInputPasswordConfirm1') as InputElement).value ?? '';

    DivElement alertDiv = DivElement();

    if (Password == PasswordCheck) {
      alertDiv
        ..classes.addAll(['alert', 'alert-success'])
        ..setAttribute('role', 'alert')
        ..innerHtml = '''
          <h4 class="alert-heading">Готово!</h4>
          <p>Ваше замовлення оформлено успішно. Очікуйте електронного листа з підтвердженням на $email.</p>
        ''';
    } else {
      alertDiv
        ..classes.addAll(['alert', 'alert-danger'])
        ..setAttribute('role', 'alert')
        ..innerHtml = '''
          <h4 class="alert-heading">Помилка!</h4>
          <p>Паролі не збігаються.</p>
        ''';
    }

    output.children.clear();
    output.append(alertDiv);
  });
}
