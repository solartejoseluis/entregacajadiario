<?php
/**
 * Define database parameters here
 */
define("DB_USER", 'your_username');
define("DB_PASSWORD", 'your_password');
define("DB_NAME", 'your_db_name');
define("DB_HOST", 'localhost');
define("BACKUP_DIR", 'myphp-backup-files'); // Comment this line to use same script's directory ('.')
define("TABLES", '*'); // Full backup
//define("TABLES", 'table1 table2 table3'); // Partial backup
define("CHARSET", 'utf8');
define("GZIP_BACKUP_FILE", false); // Set to false if you want plain SQL backup files (not gzipped)
?>