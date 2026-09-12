<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $date    = date("Y-m-d H:i:s");

    $file = "messages.csv";

    if (!file_exists($file)) {
        $headers = ["Date", "Name", "Email", "Subject", "Message"];
        $fp = fopen($file, "w");
        fputcsv($fp, $headers);
        fclose($fp);
    }

    $fp = fopen($file, "a");
    fputcsv($fp, [$date, $name, $email, $subject, $message]);
    fclose($fp);

    echo "<script>
        alert('✅ Thank you, your message has been received!');
        window.location.href='contact.html';
    </script>";
} else {
    echo "Invalid request.";
}
?>
