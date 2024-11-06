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
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `id_sys` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT 'unidade padrão',
  `quebra_cabecas_score` int NOT NULL DEFAULT '0',
  `conhece_o_uniforme_score` int NOT NULL DEFAULT '0',
  `saindo_da_casa_de_jo_score` int NOT NULL DEFAULT '0',
  `campo_minado_score` int NOT NULL DEFAULT '0',
  `so_de_cabeca_score` int NOT NULL DEFAULT '0',
  `descubra_o_no_score` int NOT NULL DEFAULT '0',
  `fogos_e_fogoes_score` int NOT NULL DEFAULT '0',
  `escapando_pelas_maos_score` int NOT NULL DEFAULT '0',
  `cordeiro_score` int NOT NULL DEFAULT '0',
  `pontuacao_total` int GENERATED ALWAYS AS (((((((((`quebra_cabecas_score` + `conhece_o_uniforme_score`) + `saindo_da_casa_de_jo_score`) + `campo_minado_score`) + `so_de_cabeca_score`) + `descubra_o_no_score`) + `fogos_e_fogoes_score`) + `escapando_pelas_maos_score`) + `cordeiro_score`)) STORED,
  `caminho_foto` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` (`id_sys`, `nome`, `quebra_cabecas_score`, `conhece_o_uniforme_score`, `saindo_da_casa_de_jo_score`, `campo_minado_score`, `so_de_cabeca_score`, `descubra_o_no_score`, `fogos_e_fogoes_score`, `escapando_pelas_maos_score`, `cordeiro_score`, `caminho_foto`) VALUES (1,'panda',4,6,0,0,0,0,34,0,600,NULL),(2,'aguia real',0,0,0,0,0,0,0,0,800,NULL),(3,'raposa',0,0,0,0,0,0,0,0,800,NULL),(4,'pantera',0,0,0,0,0,0,0,0,800,NULL),(5,'falcão',0,0,0,0,0,0,0,0,800,NULL),(6,'tigre',0,0,0,0,0,0,0,0,800,NULL),(7,'urso',0,0,0,0,0,0,0,0,800,NULL),(8,'lobo',0,0,0,0,0,0,0,0,800,NULL);
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-06 12:56:26
