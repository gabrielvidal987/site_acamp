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
-- Table structure for table `atividades`
--

DROP TABLE IF EXISTS `atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atividades` (
  `id_sys` int NOT NULL AUTO_INCREMENT,
  `nome_atividade` varchar(50) DEFAULT NULL,
  `pontuacao_inicial` int DEFAULT '0',
  `caminho_foto` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atividades`
--

LOCK TABLES `atividades` WRITE;
/*!40000 ALTER TABLE `atividades` DISABLE KEYS */;
INSERT INTO `atividades` VALUES (1,'Quebra Cabeças',0,'logo_atividades/atividade_exemplo.png'),(2,'Conhece O Uniforme?',0,'logo_atividades/atividade_exemplo.png'),(3,'Saindo Da Casa De Jó',0,'logo_atividades/atividade_exemplo.png'),(4,'Campo Minado',0,'logo_atividades/atividade_exemplo.png'),(5,'Só De Cabeça',0,'logo_atividades/atividade_exemplo.png'),(6,'Descubra O Nó',0,'logo_atividades/atividade_exemplo.png'),(7,'Fogos E Fogões',0,'logo_atividades/atividade_exemplo.png'),(8,'Escapando Pelas Mãos',0,'logo_atividades/atividade_exemplo.png'),(9,'Cordeiro',800,'logo_atividades/atividade_exemplo.png');
/*!40000 ALTER TABLE `atividades` ENABLE KEYS */;
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
