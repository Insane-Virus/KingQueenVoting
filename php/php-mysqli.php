<?php
$servername = "localhost";
$username = "lenovo";
$password = "lenovo";
$dbname = "voting";
$QString = $_GET['data'];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$result = $conn->query($QString);

if ($result) {
       $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
}
$conn->close();
?>
