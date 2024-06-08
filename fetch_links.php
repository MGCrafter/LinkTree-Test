<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT title, url FROM links";
$result = $conn->query($sql);

$links = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $links[] = $row;
    }
}

$conn->close();
echo json_encode($links);
?>
