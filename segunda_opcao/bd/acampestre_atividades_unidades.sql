-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: acampestre
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `atividades_unidades`
--

DROP TABLE IF EXISTS `atividades_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atividades_unidades` (
  `id_sys` int NOT NULL AUTO_INCREMENT,
  `nome_atividade` varchar(50) DEFAULT NULL,
  `caminho_foto_atividade` varchar(50) DEFAULT NULL,
  `panda` varchar(50) DEFAULT NULL,
  `agua_real` varchar(50) DEFAULT NULL,
  `raposa` varchar(50) DEFAULT NULL,
  `pantera` varchar(50) DEFAULT NULL,
  `falcao` varchar(50) DEFAULT NULL,
  `tigre` varchar(50) DEFAULT NULL,
  `urso` varchar(50) DEFAULT NULL,
  `lobo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atividades_unidades`
--

LOCK TABLES `atividades_unidades` WRITE;
/*!40000 ALTER TABLE `atividades_unidades` DISABLE KEYS */;
INSERT INTO `atividades_unidades` VALUES (1,'Quebra Cabeças','logo_atividades/atividade_exemplo.png','6','0','0','0','0','0','0','0'),(2,'Conhece O Uniforme?','logo_atividades/atividade_exemplo.png','7','0','0','0','0','0','0','0'),(3,'Saindo Da Casa De Jó?','logo_atividades/atividade_exemplo.png','45','0','0','0','0','0','0','0'),(4,'Campo Minado','logo_atividades/atividade_exemplo.png','0','0','0','0','0','0','0','0'),(5,'Só De Cabeça','logo_atividades/atividade_exemplo.png','0','0','0','0','0','0','0','0'),(6,'Descubra O Nó','logo_atividades/atividade_exemplo.png','4','0','0','0','0','0','0','0'),(7,'Fogos E Fogões','logo_atividades/atividade_exemplo.png','6','0','0','0','0','0','0','0'),(8,'Escapando Pelas Mãos','logo_atividades/atividade_exemplo.png','0','0','0','0','0','0','0','0'),(9,'Cordeiro','logo_atividades/atividade_exemplo.png','200','800','800','800','800','800','800','800'),(10,'Pontuação total','logo_atividades/atividade_exemplo.png','268','800','800','800','800','800','800','800'),(11,'caminho_foto_unidade','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png','logo_unidades/logo_exemplo.png');
/*!40000 ALTER TABLE `atividades_unidades` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-06 16:17:21
