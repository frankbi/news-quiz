<?php

	$num = $_POST['score'];
	
	$file_to_read = file_get_contents("scores.csv");
	$file_to_read_array = array();	
	$file_to_read_array = explode("|", $file_to_read);

	// Update with new index and score
	$file_to_read_array[0] = $file_to_read_array[0] + 1;
	$file_to_read_array[1] = $file_to_read_array[1] + $num;

	// Compute average, then echo to page
	$average = $file_to_read_array[1] / $file_to_read_array[0];	
	echo $average;

	// Write to combined score to variable to replace scores file
	$new_combined_data = $file_to_read_array[0] . "|" . $file_to_read_array[1];

	// Write to CSV
	$file_to_write = fopen("scores.csv", "w");

	fwrite($file_to_write, $new_combined_data);

	// Close that sucka
	fclose($file_to_write);

?>
