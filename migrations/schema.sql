/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `schema_migrations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_artist`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_artist` (
  `artist_id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) DEFAULT NULL,
  `artist_name` varchar(25) NOT NULL,
  `artist_phone` decimal(10,0) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `artist_image` mediumblob NOT NULL,
  PRIMARY KEY (`artist_id`),
  KEY `email` (`email`),
  CONSTRAINT `tbl_artist_ibfk_1` FOREIGN KEY (`email`) REFERENCES `tbl_login` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_card`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_card` (
  `card_id` int(10) NOT NULL AUTO_INCREMENT,
  `artist_id` int(10) DEFAULT NULL,
  `card_name` varchar(25) NOT NULL,
  `card_number` varchar(16) NOT NULL,
  `card_expiry` date NOT NULL,
  PRIMARY KEY (`card_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `tbl_card_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `tbl_artist` (`artist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_customer`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_customer` (
  `customer_id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) DEFAULT NULL,
  `customer_name` varchar(25) NOT NULL,
  `customer_phone` decimal(10,0) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`customer_id`),
  KEY `email` (`email`),
  CONSTRAINT `tbl_customer_ibfk_1` FOREIGN KEY (`email`) REFERENCES `tbl_login` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_follower`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_follower` (
  `follower_id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) DEFAULT NULL,
  `artist_id` int(10) DEFAULT NULL,
  `follow_status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`follower_id`),
  UNIQUE KEY `artist_id` (`artist_id`,`email`),
  KEY `email` (`email`),
  CONSTRAINT `tbl_follower_ibfk_1` FOREIGN KEY (`email`) REFERENCES `tbl_login` (`email`),
  CONSTRAINT `tbl_follower_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `tbl_artist` (`artist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_genre`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_genre` (
  `genre_id` int(10) NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(25) NOT NULL,
  `genre_status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_language`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_language` (
  `language_id` int(10) NOT NULL AUTO_INCREMENT,
  `language_name` varchar(25) NOT NULL,
  `language_status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_login`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_login` (
  `email` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `type` varchar(10) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_music`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_music` (
  `music_id` int(10) NOT NULL AUTO_INCREMENT,
  `publisher_id` int(10) NOT NULL,
  `artist_id` int(10) NOT NULL,
  `genre_id` int(10) NOT NULL,
  `language_id` int(10) NOT NULL,
  `music_name` varchar(25) NOT NULL,
  `music_status` varchar(10) NOT NULL,
  `music_image` mediumblob NOT NULL,
  `music_price` int(10) DEFAULT 0,
  `music_file` mediumblob NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`music_id`),
  KEY `publisher_id` (`publisher_id`),
  KEY `genre_id` (`genre_id`),
  KEY `artist_id` (`artist_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `tbl_music_ibfk_1` FOREIGN KEY (`publisher_id`) REFERENCES `tbl_publisher` (`publisher_id`),
  CONSTRAINT `tbl_music_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `tbl_genre` (`genre_id`),
  CONSTRAINT `tbl_music_ibfk_3` FOREIGN KEY (`artist_id`) REFERENCES `tbl_artist` (`artist_id`),
  CONSTRAINT `tbl_music_ibfk_4` FOREIGN KEY (`language_id`) REFERENCES `tbl_language` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_payment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_payment` (
  `payment_id` int(10) NOT NULL AUTO_INCREMENT,
  `card_id` int(10) DEFAULT NULL,
  `music_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `music_id` (`music_id`),
  CONSTRAINT `tbl_payment_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `tbl_music` (`music_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_playlist_child`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_playlist_child` (
  `playlist_child_id` int(10) NOT NULL AUTO_INCREMENT,
  `playlist_master_id` int(10) DEFAULT NULL,
  `music_id` int(10) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`playlist_child_id`),
  KEY `playlist_master_id` (`playlist_master_id`),
  KEY `music_id` (`music_id`),
  CONSTRAINT `tbl_playlist_child_ibfk_1` FOREIGN KEY (`playlist_master_id`) REFERENCES `tbl_playlist_master` (`playlist_master_id`),
  CONSTRAINT `tbl_playlist_child_ibfk_2` FOREIGN KEY (`music_id`) REFERENCES `tbl_music` (`music_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_playlist_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_playlist_master` (
  `playlist_master_id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) DEFAULT NULL,
  `playlist_name` varchar(20) NOT NULL,
  `playlist_status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`playlist_master_id`),
  KEY `email` (`email`),
  CONSTRAINT `tbl_playlist_master_ibfk_1` FOREIGN KEY (`email`) REFERENCES `tbl_login` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_publisher`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_publisher` (
  `publisher_id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) DEFAULT NULL,
  `publisher_name` varchar(25) NOT NULL,
  `publisher_phone` varchar(10) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`publisher_id`),
  KEY `email` (`email`),
  CONSTRAINT `tbl_publisher_ibfk_1` FOREIGN KEY (`email`) REFERENCES `tbl_login` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'soundly'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

--
-- Dbmate schema migrations
--

LOCK TABLES `schema_migrations` WRITE;
INSERT INTO `schema_migrations` (version) VALUES
  ('20230225171116'),
  ('20230225171120'),
  ('20230225171123'),
  ('20230225171127'),
  ('20230226084049'),
  ('20230226122547'),
  ('20230226123338'),
  ('20230302095042'),
  ('20230302095047'),
  ('20230310112855'),
  ('20230310112857'),
  ('20230310112900');
UNLOCK TABLES;
