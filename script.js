(function () {
    emailjs.init("5EpzE1X9S3UEAOSn1"); 
  })();
  
  function sendEmails() {
    const senderEmail = document.getElementById("senderEmail").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
  
    const validEmails = [];
    const invalidEmails = [];
  
    const file = document.getElementById("csvFile").files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        const csv = event.target.result;
        const lines = csv.split('\n');
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  
        lines.forEach(email => {
            email = email.trim();
            if (emailRegex.test(email)) {
                validEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
        });
  
        validEmails.forEach(email => {
            const templateParams = {
                to_name: email,
                from_name: senderEmail,
                message_html: message,
                subject_html: subject
            };
  
            emailjs.send('service_13s3n3a', 'template_huwrmzf', templateParams)
                .then(response => {
                    console.log("SUCCESS", response);
                }, error => {
                    console.log("FAILED", error);
                });
        });
  
        document.getElementById("validEmails").innerHTML = validEmails.join("<br>");
        document.getElementById("invalidEmails").innerHTML = invalidEmails.join("<br>");
        document.getElementById("validEmailCount").innerText = (`${validEmails.length}`);
        document.getElementById("invalidEmailCount").innerText = (`${invalidEmails.length}`);
  
        alert("Emails sent to valid email addresses.");
    };
  }