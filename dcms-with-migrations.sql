-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: dcms
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (10,'20190305001714_create_user_table.js',1,'2019-03-04 16:32:06'),(11,'20190305001828_create_patient_table.js',1,'2019-03-04 16:32:06'),(12,'20190305001925_create_treatment_table.js',1,'2019-03-04 16:32:08'),(13,'20190309130957_create_patient_adult_teeth_chart.js',2,'2019-03-09 05:23:35'),(14,'20190309132405_create_patient_child_teeth_chart.js',3,'2019-03-09 05:29:44'),(15,'20190310215400_remove_status_column_on_treatment_table.js',4,'2019-03-10 13:54:42'),(16,'20190311021832_add_balance_column.js',5,'2019-03-10 18:19:35'),(17,'20190311022230_create_installment_payment_history_table.js',6,'2019-03-10 18:25:28'),(18,'20190311105512_alter_date_treated_column_to_nullable.js',7,'2019-03-11 03:02:05'),(19,'20190311112427_remove_balance_colum.js',8,'2019-03-11 03:25:04'),(21,'20190311112636_drop_installment_payment_history_table.js',9,'2019-03-11 03:28:19'),(22,'20190311112926_create_payment_transaction_table.js',10,'2019-03-11 03:30:11'),(24,'20190311144407_alter_payment_transaction_date_treated_column.js',11,'2019-03-11 06:48:36'),(25,'20190316005028_create_appointment_table.js',12,'2019-03-15 16:55:04'),(26,'20190321123140_remove_last_visit_column.js',13,'2019-03-21 04:32:44'),(27,'20190406213139_alter_id_adult_chart.js',14,'2019-04-06 13:39:03'),(28,'20190406213656_alter_id_child_chart.js',14,'2019-04-06 13:39:03'),(29,'20190406213955_add_id_adult_chart.js',15,'2019-04-06 13:41:02'),(30,'20190406214003_add_id_child_chart.js',15,'2019-04-06 13:41:02'),(31,'20190419205829_add.js',16,'2019-04-19 13:08:05');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `birthday` datetime NOT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `civil_status` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (79,'2O9AB817','Cathleen Tolentino','Mangato','1997-04-01 00:00:00','','single',''),(80,'VSMMLJ8P','Patricia Dane Miguel','Korea','1999-04-01 00:00:00','','',''),(81,'8XNUD6YC','Shaina Ballesteros','Magat Salamat','1999-01-27 00:00:00','','',''),(82,'3UZIYDB2','Chrisha Jewel Pascua','Bacsil','1999-01-08 00:00:00','','single',''),(83,'973IO6OV','April Joyce Guillermo','Piddig','1999-04-27 00:00:00','Graphic Designer','single',''),(84,'U30GAL1A','Frances Deanne Medina','Piddig','1999-06-10 00:00:00','','','09166417429'),(85,'W60JJMIwGG1U','Joecel Pergis','Curimao','1998-08-30 00:00:00','Graphic Designer','single','09384218164');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_adult_teeth_chart`
--

DROP TABLE IF EXISTS `patient_adult_teeth_chart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_adult_teeth_chart` (
  `UR_1` varchar(255) DEFAULT NULL,
  `UR_2` varchar(255) DEFAULT NULL,
  `UR_3` varchar(255) DEFAULT NULL,
  `UR_4` varchar(255) DEFAULT NULL,
  `UR_5` varchar(255) DEFAULT NULL,
  `UR_6` varchar(255) DEFAULT NULL,
  `UR_7` varchar(255) DEFAULT NULL,
  `UR_8` varchar(255) DEFAULT NULL,
  `UL_9` varchar(255) DEFAULT NULL,
  `UL_10` varchar(255) DEFAULT NULL,
  `UL_11` varchar(255) DEFAULT NULL,
  `UL_12` varchar(255) DEFAULT NULL,
  `UL_13` varchar(255) DEFAULT NULL,
  `UL_14` varchar(255) DEFAULT NULL,
  `UL_15` varchar(255) DEFAULT NULL,
  `UL_16` varchar(255) DEFAULT NULL,
  `LL_17` varchar(255) DEFAULT NULL,
  `LL_18` varchar(255) DEFAULT NULL,
  `LL_19` varchar(255) DEFAULT NULL,
  `LL_20` varchar(255) DEFAULT NULL,
  `LL_21` varchar(255) DEFAULT NULL,
  `LL_22` varchar(255) DEFAULT NULL,
  `LL_23` varchar(255) DEFAULT NULL,
  `LL_24` varchar(255) DEFAULT NULL,
  `LR_25` varchar(255) DEFAULT NULL,
  `LR_26` varchar(255) DEFAULT NULL,
  `LR_27` varchar(255) DEFAULT NULL,
  `LR_28` varchar(255) DEFAULT NULL,
  `LR_29` varchar(255) DEFAULT NULL,
  `LR_30` varchar(255) DEFAULT NULL,
  `LR_31` varchar(255) DEFAULT NULL,
  `LR_32` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_adult_teeth_chart`
--

LOCK TABLES `patient_adult_teeth_chart` WRITE;
/*!40000 ALTER TABLE `patient_adult_teeth_chart` DISABLE KEYS */;
INSERT INTO `patient_adult_teeth_chart` VALUES ('decayed',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'filled',79),('',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'missing',80),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,81),(NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,82),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,83),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','missing',84),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,85);
/*!40000 ALTER TABLE `patient_adult_teeth_chart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_child_teeth_chart`
--

DROP TABLE IF EXISTS `patient_child_teeth_chart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_child_teeth_chart` (
  `UR_A` varchar(255) DEFAULT NULL,
  `UR_B` varchar(255) DEFAULT NULL,
  `UR_C` varchar(255) DEFAULT NULL,
  `UR_D` varchar(255) DEFAULT NULL,
  `UR_E` varchar(255) DEFAULT NULL,
  `UL_F` varchar(255) DEFAULT NULL,
  `UL_G` varchar(255) DEFAULT NULL,
  `UL_H` varchar(255) DEFAULT NULL,
  `UL_I` varchar(255) DEFAULT NULL,
  `UL_J` varchar(255) DEFAULT NULL,
  `LL_K` varchar(255) DEFAULT NULL,
  `LL_L` varchar(255) DEFAULT NULL,
  `LL_M` varchar(255) DEFAULT NULL,
  `LL_N` varchar(255) DEFAULT NULL,
  `LL_O` varchar(255) DEFAULT NULL,
  `LR_P` varchar(255) DEFAULT NULL,
  `LR_Q` varchar(255) DEFAULT NULL,
  `LR_R` varchar(255) DEFAULT NULL,
  `LR_S` varchar(255) DEFAULT NULL,
  `LR_T` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_child_teeth_chart`
--

LOCK TABLES `patient_child_teeth_chart` WRITE;
/*!40000 ALTER TABLE `patient_child_teeth_chart` DISABLE KEYS */;
INSERT INTO `patient_child_teeth_chart` VALUES ('missing','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'filled',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,79),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,80),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,81),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,82),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,83),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,84),(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,85);
/*!40000 ALTER TABLE `patient_child_teeth_chart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_transaction`
--

DROP TABLE IF EXISTS `payment_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_transaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount_paid` int(11) NOT NULL,
  `current_balance_before` int(11) DEFAULT NULL,
  `new_balance_after` int(11) DEFAULT NULL,
  `treatment_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `date_paid` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_transaction_treatment_id_foreign` (`treatment_id`),
  KEY `payment_transaction_user_id_foreign` (`user_id`),
  CONSTRAINT `payment_transaction_treatment_id_foreign` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`id`),
  CONSTRAINT `payment_transaction_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_transaction`
--

LOCK TABLES `payment_transaction` WRITE;
/*!40000 ALTER TABLE `payment_transaction` DISABLE KEYS */;
INSERT INTO `payment_transaction` VALUES (164,2500,NULL,NULL,135,1,'2019-04-06 00:00:00'),(165,1500,2500,1000,136,1,'2019-04-06 00:00:00'),(166,800,NULL,NULL,139,1,'2019-04-06 00:00:00'),(167,300,800,500,140,1,'2019-04-06 00:00:00'),(168,250,500,250,140,1,'2019-04-06 00:00:00'),(169,800,NULL,NULL,141,1,'2019-04-11 00:00:00'),(170,25000,50000,25000,142,1,'2019-04-12 00:00:00'),(171,100,25000,24900,142,1,'2019-04-12 00:00:00'),(172,100,24900,24800,142,1,'2019-04-12 00:00:00'),(173,120,24800,24680,142,1,'2019-04-12 00:00:00'),(174,200,24680,24480,142,1,'2019-04-12 00:00:00'),(175,300,24480,24180,142,1,'2019-04-12 00:00:00'),(176,500,24180,23680,142,1,'2019-04-12 00:00:00'),(177,100,23680,23580,142,1,'2019-04-12 00:00:00'),(178,350,23580,23230,142,1,'2019-04-12 00:00:00'),(179,230,23230,23000,142,1,'2019-04-12 00:00:00'),(180,1000,23000,22000,142,1,'2019-04-12 00:00:00'),(181,1500,22000,20500,142,1,'2019-04-12 00:00:00'),(182,100,20500,20400,142,1,'2019-04-12 00:00:00'),(183,100,20400,20300,142,1,'2019-04-12 00:00:00'),(184,300,20300,20000,142,1,'2019-04-12 00:00:00'),(185,800,NULL,NULL,143,1,'2019-04-12 00:00:00'),(186,1000,20000,19000,142,1,'2019-04-12 00:00:00'),(187,1000,19000,18000,142,1,'2019-04-12 00:00:00'),(188,1200,18000,16800,142,1,'2019-04-12 00:00:00'),(189,1800,16800,15000,142,1,'2019-04-12 00:00:00'),(190,2500,15000,12500,142,1,'2019-04-12 00:00:00'),(191,520,12500,11980,142,1,'2019-04-12 00:00:00'),(192,120,11980,11860,142,1,'2019-04-12 00:00:00'),(193,1100,11860,10760,142,1,'2019-04-12 00:00:00'),(194,160,10760,10600,142,1,'2019-04-12 00:00:00'),(195,200,10600,10400,142,1,'2019-04-12 00:00:00'),(196,800,NULL,NULL,144,1,'2019-04-12 00:00:00'),(197,200,1000,800,136,9,'2019-04-13 00:00:00'),(198,800,NULL,NULL,145,1,'2019-04-14 00:00:00'),(199,800,800,0,136,1,'2019-04-14 00:00:00'),(200,8000,88000,80000,147,1,'2019-04-14 00:00:00'),(201,8000,88000,80000,148,1,'2019-04-14 00:00:00'),(202,400,1200,800,149,1,'2019-04-14 00:00:00'),(203,200,80000,79800,148,1,'2019-04-17 00:00:00'),(204,300,79800,79500,148,1,'2019-04-17 00:00:00'),(205,79500,79500,0,148,1,'2019-04-17 00:00:00'),(206,300,500,200,150,1,'2019-04-19 00:00:00'),(207,800,NULL,NULL,151,1,'2019-04-19 00:00:00'),(208,100,200,100,150,1,'2019-04-20 00:00:00'),(209,8000,88000,80000,152,1,'2019-04-20 00:00:00'),(210,2500,3500,1000,153,1,'2019-04-20 00:00:00');
/*!40000 ALTER TABLE `payment_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment`
--

DROP TABLE IF EXISTS `treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `tooth_affected_no` varchar(255) DEFAULT NULL,
  `total_amount_to_pay` int(11) DEFAULT NULL,
  `payment_type` varchar(255) NOT NULL,
  `date_treated` datetime NOT NULL,
  `patient_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `treatment_patient_id_foreign` (`patient_id`),
  KEY `treatment_user_id_foreign` (`user_id`),
  CONSTRAINT `treatment_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  CONSTRAINT `treatment_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment`
--

LOCK TABLES `treatment` WRITE;
/*!40000 ALTER TABLE `treatment` DISABLE KEYS */;
INSERT INTO `treatment` VALUES (135,'Filling','LR_32',2500,'in-full','2019-04-06 00:00:00',79,11),(136,'Filling','UL_J',2500,'installment','2019-04-06 00:00:00',79,11),(137,'Remove','UR_A',NULL,'no-charge','2019-04-06 00:00:00',79,11),(138,'Veneer','UR_D',NULL,'no-charge','2019-04-06 00:00:00',79,11),(139,'Cleaning','',800,'in-full','2019-04-06 00:00:00',80,9),(140,'Extraction','LR_32',800,'installment','2019-04-06 00:00:00',80,9),(141,'Cleaning','',800,'in-full','2019-04-11 00:00:00',79,11),(142,'Braces','',50000,'installment','2019-04-12 00:00:00',80,9),(143,'Cleaning','',800,'in-full','2019-04-12 00:00:00',79,11),(144,'Tooth Extraction','LR_32',800,'in-full','2019-04-12 00:00:00',80,9),(145,'Cleaning','',800,'in-full','2019-04-14 00:00:00',79,11),(146,'Check up','',NULL,'no-charge','2019-04-14 00:00:00',81,8),(147,'Braces','',88000,'installment','2019-04-14 00:00:00',82,1),(148,'Braces','',88000,'installment','2019-04-14 00:00:00',84,8),(149,'Braces','',1200,'installment','2019-04-14 00:00:00',79,8),(150,'Cleaning','',500,'installment','2019-04-19 00:00:00',84,9),(151,'Tooth Extraction','LR_32',800,'in-full','2019-04-19 00:00:00',84,8),(152,'Ewan ko ahahaha','',88000,'installment','2019-04-20 00:00:00',79,8),(153,'Basta','',3500,'installment','2019-04-20 00:00:00',84,8);
/*!40000 ALTER TABLE `treatment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `emailaddress` varchar(255) DEFAULT NULL,
  `patient_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2b$10$jL0QiyMKg8APliBakkXPp.iL463a5Rjuu/QJ8pATCjxe8AU0Hk.ra','S.E Jonathan','1998-08-19 00:00:00','Internet','dentist','astalamander@gmail.com',NULL),(8,'patricia','$2b$10$XBFsQIkEYrKRJWyRy.8rCuhvZT6hqPwxiPhLumk0AWVWOBCeELcjW','Patricia Dane Miguel','1999-02-21 00:00:00','Laoag City','dentist','patriciadane@gmail.com',NULL),(9,'sachi','$2b$10$4UIkXySPr1Of862iH/rr2ORB3439GkASh/1E30Fg1QHi2u9JR3fzi','Frances Deanne Medina','1999-06-10 00:00:00','Piddig','dentalaide',NULL,NULL),(11,'pubg','$2b$10$jTKUJGSUpT7IvUDwLq/Na.8eka7H.hwT92XxN.hk/7OwfbStlrfEq','Czar Emman Alejandro','1998-03-01 00:00:00','one-o-five','dentalaide','',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-22  0:33:36
