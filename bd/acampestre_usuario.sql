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
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_sys` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT 'usuario padrão',
  `senha` varchar(50) NOT NULL DEFAULT 'senha_acesso',
  `acesso_prova` varchar(50) NOT NULL DEFAULT 'nenhum',
  `unidade` varchar(50) DEFAULT 'fenix',
  PRIMARY KEY (`id_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'staff1','1','Quebra Cabeças','staff'),(3,'staff2','2','Conhece O Uniforme?','staff'),(4,'staff3','3','Saindo Da Casa De Jó?','staff'),(5,'staff4','4','Campo Minado','staff'),(6,'staff5','5','Só De Cabeça','staff'),(7,'staff6','6','Descubra O Nó','staff'),(8,'staff7','7','Fogos E Fogões','staff'),(9,'staff8','8','Escapando Pelas Mãos','staff'),(10,'staff9','9','Cordeiro','staff'),(11,'conselheiro1','c1','nenhum','panda'),(12,'conselheiro2','c2','nenhum','aguia_real'),(13,'conselheiro3','c3','nenhum','raposa'),(14,'conselheiro4','c4','nenhum','pantera'),(15,'conselheiro5','c5','nenhum','falcao'),(16,'conselheiro6','c6','nenhum','tigre'),(17,'conselheiro7','c7','nenhum','urso'),(18,'conselheiro8','c8','nenhum','lobo'),(19,'diretoria','ac','nenhum','diretor');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-11 15:13:16
