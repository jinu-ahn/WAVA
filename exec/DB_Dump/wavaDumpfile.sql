-- MySQL dump 10.13  Distrib 9.0.1, for Linux (x86_64)
--
-- Host: localhost    Database: wava
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `channel_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `channel_sido` varchar(255) NOT NULL,
  `channel_sigungu` varchar(255) NOT NULL,
  `channel_title` varchar(255) NOT NULL,
  `channel_description` varchar(255) DEFAULT NULL,
  `channel_memo` varchar(255) DEFAULT NULL,
  `channel_type` varchar(4) NOT NULL,
  `blue` int DEFAULT NULL,
  `green` int DEFAULT NULL,
  `red` int DEFAULT NULL,
  PRIMARY KEY (`channel_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `channel_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES (1,1,'광주광역시','동구','김민주','김민주님의 채널 입니다.',NULL,'C002',0,0,0),(2,2,'서울특별시','강남구','wava','대한민국 화이팅',NULL,'C002',0,0,0),(3,3,'서울특별시','강남구','진구','진구님의 채널 입니다.',NULL,'C002',0,0,0),(4,4,'전라북도','전주시','지훈입니다','킄킄킄 하이입니다요들레이히~~',NULL,'C002',0,0,0),(5,5,'광주광역시','광산구','이병수','이병수님의 채널 입니다.',NULL,'C002',0,0,0),(6,6,'서울특별시','강서구','myid','강아지는 강하지',NULL,'C002',0,0,0),(7,1,'광주광역시','북구','좋은 곳 알아요','들어오면 무조건 이득',NULL,'C001',144,187,138),(8,7,'광주광역시','광산구','evil','evil님의 채널 입니다.',NULL,'C002',0,0,0),(9,6,'서울특별시','강서구','광주광역시 서구 초밥드실분','혼자가겠습니다.',NULL,'C001',65,134,176),(10,3,'광주광역시','광산구','맛집 탐방대','같이 맛집가요!',NULL,'C001',135,54,106),(11,2,'서울특별시','강남구','오늘 저녁 뼈해장국 먹을 사람~','어등뼈해장국으로 모여!',NULL,'C001',204,117,181),(12,2,'서울특별시','강남구','엔젤 공부팟','우리는 흑석 엔젤로 간다',NULL,'C001',197,203,172),(13,3,'광주광역시','광산구','드라이브 어때요','면허만 있습니다. 차 있으신분 환영',NULL,'C001',82,117,55),(14,4,'전라북도','전주시','전주에서 행복 워케이션','전주에서 같이 추억 쌓으면서 능률 올릴 사람들만 들어오세요!!',NULL,'C001',95,173,70),(15,2,'서울특별시','강남구','클라이밍 좋아하는 자 이리 오라','하지만 난 안 좋아하지 ',NULL,'C001',178,81,160),(16,3,'광주광역시','광산구','서울 가기전에 추억 남기자','서울에서 오신분 같이 놀고 내일 같이 돌아가실래요?',NULL,'C001',125,151,203),(17,2,'서울특별시','강남구','워케이션 서울 노래방','같이 노래불러봐요! 노래 좋아하는 서울 사람만! ',NULL,'C001',134,52,173),(18,3,'서울특별시','강남구','공유 오피스 같이 가요','공유 오피스 가서 모각코?',NULL,'C001',65,79,185),(19,3,'서울특별시','강남구','불금팟','불금에도 일만하려고요? 나갑시다!!',NULL,'C001',82,135,104),(20,8,'서울특별시','강동구','good','good님의 채널 입니다.',NULL,'C002',0,0,0),(21,7,'광주광역시','광산구','광주 워케이션 가실분','광주',NULL,'C001',59,123,55),(22,9,'서울특별시','강남구','내일하루코딩','내일하루코딩님의 채널 입니다.',NULL,'C002',0,0,0),(23,10,'서울특별시','관악구','abcd','abcd님의 채널 입니다.',NULL,'C002',0,0,0);
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel_user`
--

DROP TABLE IF EXISTS `channel_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel_user` (
  `channel_user_id` bigint NOT NULL AUTO_INCREMENT,
  `channel_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`channel_user_id`),
  KEY `user_id` (`user_id`),
  KEY `channel_id` (`channel_id`),
  CONSTRAINT `channel_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `channel_user_ibfk_2` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel_user`
--

LOCK TABLES `channel_user` WRITE;
/*!40000 ALTER TABLE `channel_user` DISABLE KEYS */;
INSERT INTO `channel_user` VALUES (1,7,1),(2,7,2),(3,7,3),(4,7,4),(5,9,6),(6,10,3),(7,11,2),(8,12,2),(9,13,3),(10,14,4),(11,13,4),(12,9,4),(13,15,2),(14,16,3),(15,17,2),(16,11,4),(17,18,3),(18,19,3),(19,9,1),(20,9,8),(21,11,3),(22,12,3),(23,10,6),(24,11,7),(25,16,1),(26,21,7);
/*!40000 ALTER TABLE `channel_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chat_id` bigint NOT NULL AUTO_INCREMENT,
  `chat_content` varchar(255) DEFAULT NULL,
  `chat_regist_time` datetime NOT NULL,
  `channel_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `channel_id` (`channel_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`) ON DELETE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,'ㅎㅇㅎㅇ','2024-08-15 18:09:49',7,4),(2,'ㅇ','2024-08-15 18:09:49',7,4),(3,'어등뼈해장국 ㄱ','2024-08-15 18:10:15',7,2),(4,'다들 고생많으셨슴다','2024-08-15 18:11:14',7,3),(5,'ㅠㅠ','2024-08-15 18:11:18',7,1),(6,'이거 녹화만 뜨고 GIF 하자','2024-08-15 18:11:25',7,2),(7,'맥북 이슈','2024-08-15 18:12:55',7,1),(8,'ㅋㅋ','2024-08-15 18:12:56',7,1),(9,'안녕하세요!','2024-08-15 18:33:36',9,4),(10,'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ','2024-08-15 18:35:04',7,1),(11,'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ','2024-08-15 18:44:08',9,1),(12,'와항항 재밌다','2024-08-15 18:44:23',7,4),(13,'다','2024-08-15 18:44:23',7,4),(14,'다다다','2024-08-15 18:46:18',7,3),(15,'좋은 저녁이네요!','2024-08-15 18:55:40',9,6),(16,'어등뼈 가자','2024-08-15 19:13:50',11,2),(17,'죠','2024-08-15 19:13:53',11,3),(18,'어등뼈로 가시죠','2024-08-15 19:13:53',11,3),(19,'좋습니다','2024-08-15 19:13:56',11,7),(20,'오늘은 해장국 각','2024-08-15 19:13:56',11,2),(21,'좋아~','2024-08-15 19:13:57',11,4),(22,'오타 뭔데~','2024-08-15 19:14:03',11,2),(23,'ㅋ','2024-08-15 19:14:07',11,4),(24,'ㅋㅋㅋ','2024-08-15 19:14:07',11,4),(25,'맥북이슈..','2024-08-15 19:14:08',11,3),(26,'그럴 수 있지','2024-08-15 19:14:11',11,2),(27,'아무튼 오늘 저녁은 해장국?','2024-08-15 19:14:17',11,2),(28,'어등뼈로 갑시다 우리','2024-08-15 19:14:17',11,3),(29,'배고프다..','2024-08-15 19:14:18',11,4),(30,'고고','2024-08-15 19:14:22',11,3),(31,'굿','2024-08-15 19:14:24',11,2),(32,'난 초밥 먹고 싶어 ..','2024-08-15 19:14:25',11,4);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common`
--

DROP TABLE IF EXISTS `common`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common` (
  `code_type` char(4) NOT NULL,
  `code_name` varchar(255) NOT NULL,
  PRIMARY KEY (`code_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common`
--

LOCK TABLES `common` WRITE;
/*!40000 ALTER TABLE `common` DISABLE KEYS */;
/*!40000 ALTER TABLE `common` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_detail`
--

DROP TABLE IF EXISTS `common_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_detail` (
  `code_id` char(4) NOT NULL,
  `code_value` varchar(255) NOT NULL,
  `code_detail` varchar(255) NOT NULL,
  `code_type` char(4) NOT NULL,
  PRIMARY KEY (`code_id`),
  KEY `code_type` (`code_type`),
  CONSTRAINT `common_detail_ibfk_1` FOREIGN KEY (`code_type`) REFERENCES `common` (`code_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_detail`
--

LOCK TABLES `common_detail` WRITE;
/*!40000 ALTER TABLE `common_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `common_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companion`
--

DROP TABLE IF EXISTS `companion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companion` (
  `companion_id` bigint NOT NULL AUTO_INCREMENT,
  `pin_id` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`companion_id`),
  KEY `idx_pin_id` (`pin_id`),
  KEY `FK3wih5u9bstxey87w3ay9d3xsl` (`user_id`),
  CONSTRAINT `FK3wih5u9bstxey87w3ay9d3xsl` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKeuqvhpqj9p9j6yktwgpkifx42` FOREIGN KEY (`pin_id`) REFERENCES `map_pin` (`pin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companion`
--

LOCK TABLES `companion` WRITE;
/*!40000 ALTER TABLE `companion` DISABLE KEYS */;
/*!40000 ALTER TABLE `companion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `favorite_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `place_id` bigint NOT NULL,
  PRIMARY KEY (`favorite_id`),
  KEY `user_id` (`user_id`),
  KEY `place_id` (`place_id`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `place` (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed` (
  `feed_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `heart` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `channel_id` bigint NOT NULL,
  PRIMARY KEY (`feed_id`),
  KEY `channel_id` (`channel_id`),
  CONSTRAINT `feed_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed`
--

LOCK TABLES `feed` WRITE;
/*!40000 ALTER TABLE `feed` DISABLE KEYS */;
INSERT INTO `feed` VALUES (1,'광주광역시 서구입니다. 산책 나갔다가 귀여운 댕댕이를 봤어요!',3,'2024-08-15 09:32:06',6),(2,'전주 한옥마을에서 찰칵 ',2,'2024-08-15 09:35:54',4),(3,'판다는 개발이 싫다... 하지만 해야한다... ',2,'2024-08-15 09:36:14',2),(4,'놀러 나왔는데 날씨가 너무 좋네요. 강아지랑 꽃이랑 구분이 잘 안 됩니다.',2,'2024-08-15 09:36:18',6),(5,'다들 그런 날이 있잖아요, 아무것도 하기 싫고 누워만 있고 싶은 날... 저에겐 오늘이 바로 그날인 것 같아요',2,'2024-08-15 09:38:39',4),(6,'전주에 왔으면 초코파이지요! 히히 나만 먹어야지',1,'2024-08-15 09:39:30',6),(7,'참...외롭다.... ',1,'2024-08-15 09:41:49',2),(8,'밥 안주시면 물어요',1,'2024-08-15 09:41:50',3),(9,'워케이션~',1,'2024-08-15 09:42:03',8),(10,'워케이션을 아직도 몰라??',1,'2024-08-15 09:42:19',3),(11,'힐링',1,'2024-08-15 09:43:43',8),(12,'바다 공룡 워케이션입니다. 자세한 정보는 제 채널로 들어와주세요!',1,'2024-08-15 09:43:49',4),(13,'다들 보안 조심!! 개인 정보 절대지켜!!',1,'2024-08-15 09:43:52',3),(14,'와! 비행기! ',1,'2024-08-15 09:43:59',2),(15,'업무환경',1,'2024-08-15 09:44:14',8),(16,'여수 워케이션 정보 입니다! 궁금하면 제 채널로 놀러오세요!',2,'2024-08-15 09:52:12',4),(17,'군산 워케이션 정보입니다. 궁금하면 제 채널로 놀러오세요!!',1,'2024-08-15 09:55:48',4),(18,'너의이름은?',0,'2024-08-15 10:02:19',3),(19,'나는 판다다',0,'2024-08-15 10:11:56',2),(20,'오리 난다요',0,'2024-08-15 13:58:40',2),(21,'오리가 지켜보고 있다. ',0,'2024-08-15 14:00:25',2),(22,'안녕 난 레고야 ',0,'2024-08-15 14:01:31',2),(23,'멋진 유령들이랑 놀아볼사람 ',0,'2024-08-15 14:02:18',2),(24,'너무 좋아서 2탄~~',0,'2024-08-15 14:12:15',4),(25,'설~~마,,,, 추석에도 일 해? 나도~~ 어디서 일해야 할 지 모르겠다면 들어와~~',0,'2024-08-15 14:14:08',4),(26,'너무 좋은 기회 아니냐구~~ 들어와서 정보 얻고 가!!',0,'2024-08-15 14:16:03',4),(27,'푸른 용 11기 화이팅',0,'2024-08-15 14:16:11',3),(28,'일하고 쉬고~ 경계가 없어진다면 얼마나 좋을까',0,'2024-08-15 14:17:18',4),(29,'쉼과 일의 경계에서 사랑을 외칠까?? ',0,'2024-08-15 14:18:31',4),(30,'무슨 워케이션이 나랑 찰떡일까요~~ 알아맞춰 보시죠!!',0,'2024-08-15 14:19:53',4),(31,'풍경입니다!',0,'2024-08-15 14:20:53',1),(32,'라멘은 양이 부족하시다구요?? 여긴 면사리 1회 리필 가능.. 찐맛집이에요',0,'2024-08-15 14:21:06',3),(33,'여기서 일하고 싶어서 충주로 이사갈 ~뻔 ~~ 농담ㅋ',0,'2024-08-15 14:21:13',4),(34,'호텔: 넌 내게 반했어~~~~~',0,'2024-08-15 14:22:34',4),(35,'나도 번아웃일까? 궁금하다면 컴온~',0,'2024-08-15 14:23:49',4),(36,'혹시 책 좋아하니~~?? 좋아한다면 알아보고 싶을걸? 들어와서 정보 받아가~',0,'2024-08-15 14:25:06',4),(37,'어서와~ 웅장해지고 싶지?',0,'2024-08-15 14:27:01',4),(39,'디지털 노마드야? 얼른 들어와~',0,'2024-08-15 14:30:54',4),(40,'이거 완전히 럭키비키비키니시티잖아~~',0,'2024-08-15 14:34:53',4),(41,'나는 가끔 한옥마을의 중심에서 사랑을 외쳐!',0,'2024-08-15 14:36:51',4),(42,'쉼과 영감~ 왜 불러!',0,'2024-08-15 14:38:59',4),(43,'일쉼동체! 경상도',0,'2024-08-15 14:40:53',4),(44,'낭만의 현주소는 여수가 아니라 통영이라구욧~~!!!!',0,'2024-08-15 14:42:07',4),(45,'파도가 날 집어삼켜도.. 그대와 함께라면 난 견딜 수 있어',0,'2024-08-15 14:43:47',4),(46,'목포에서 같이 일 할래?',0,'2024-08-15 14:44:50',4),(47,'뷰에 놀라고! 시설에 놀라고!! 맛에 놀라고!!! 숙소에 놀라고!!!! 가격에 또 한 번 놀라는 여기는 남해입니다.',0,'2024-08-15 14:46:37',4),(48,'돌고래는 영어로 돌핀~ 알고 있었다고 ?? 아핫!!',0,'2024-08-15 14:47:55',4);
/*!40000 ALTER TABLE `feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_comment`
--

DROP TABLE IF EXISTS `feed_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `feed_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `feed_id` (`feed_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `feed_comment_ibfk_1` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`),
  CONSTRAINT `feed_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_comment`
--

LOCK TABLES `feed_comment` WRITE;
/*!40000 ALTER TABLE `feed_comment` DISABLE KEYS */;
INSERT INTO `feed_comment` VALUES (1,1,4,'너무 귀여워요!!',NULL),(2,3,4,'스트레스 풀고 화이팅!',NULL),(3,4,4,'누가 꽃인가요?',NULL),(4,3,6,'워케이션으로 기분전환 해야지요!',NULL),(5,5,3,'갬성 터진다',NULL),(6,6,3,'배고파요.. 저도 주세요',NULL),(7,11,7,'와우 풍경이 너무 좋아요!',NULL);
/*!40000 ALTER TABLE `feed_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follow_id` bigint NOT NULL AUTO_INCREMENT,
  `channel_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `channel_id` (`channel_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,6,4),(2,3,4),(3,8,4),(4,2,4),(5,4,6);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_name` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `feed_id` bigint NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `feed_id` (`feed_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/352342ee-a498-4ed2-b588-adaebd069a86.jpg',1),(2,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/3e023b2a-e1ff-4d9d-a678-0d2e97513e85.webp',2),(3,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/2de90c0d-583a-4578-bd53-36bc2b362566.gif',3),(4,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/8204f17a-57e7-4d90-85c9-3a7af88ceb85.jpg',4),(5,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/b6f9b464-cadf-44fe-ad61-3093877abf2b.webp',5),(6,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/e4c182a0-e17f-4763-a053-a4febced3456.jpg',6),(7,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/9e6ba48b-dcc2-4f0c-8b48-4cc2f96d8dee.jpg',6),(8,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/fd0fc48e-c14d-4d5a-bc1a-7a00b4eea103.jpg',7),(9,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/ec04852b-2a6c-43f1-9d48-59ae509fb310.jpeg',8),(10,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/3b34399b-77a7-4843-9d50-92830a47182d.webp',9),(11,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/7cd6b484-fc22-43e3-b057-41c8aacf9f6d.jpeg',10),(12,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/449be04d-81fe-4229-a8a6-e0fe2a3c469e.webp',11),(13,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/c88279a9-74ef-4773-a608-584450d41257.jpeg',12),(14,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/b224028c-b186-4e7b-afb2-df3b5315650c.jpeg',12),(15,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/7d042981-8deb-4d7f-9d88-a530185c85f3.jpeg',12),(16,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/8707ea44-4ec0-4dad-b9e5-ad927b42ef9e.jpeg',12),(17,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/61d11227-b510-4345-99cf-3e7e36950185.jpeg',12),(18,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/c78fb2a4-15bb-4fcf-b291-5ff2439252d5.png',13),(19,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/041ba3e7-8185-4d61-9841-c310b7ee40aa.png',13),(20,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/421cb152-7b2a-4bd5-87d6-091c05bcade4.png',13),(21,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/a32e5215-8f26-4d10-8e66-4cbdc88840fe.png',13),(22,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/7776040a-fc42-408e-a853-3e3076c1732f.png',13),(23,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/51fdd2aa-b6c7-4087-b4e0-d3d1692f2cfc.png',13),(24,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/e45e65d1-b677-4df7-a558-d37decb94388.png',13),(25,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/d0e9f27b-2968-42d6-83cf-2d57d0a629cc.png',13),(26,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/6b06a734-f1cb-4d26-a9e0-46b6e22d40fa.png',13),(27,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/cd3a1a70-0111-4a3f-a68d-fb0b86dcfd14.jpg',14),(28,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/d647d379-a0ba-4091-bf51-2676ad350cbc.webp',15),(29,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/3e3120b1-ab97-4ccd-b6f1-b312d85db090.jpeg',16),(30,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/cbaa7c88-70d8-4fa2-b8b8-881b80a73eb6.jpeg',16),(31,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/9b256e2f-b9a1-4aed-b800-49be01c8e721.jpeg',16),(32,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/f30de80b-4c07-452d-892d-d657029e867c.jpeg',16),(33,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/895bccfa-02df-4da7-9236-207d03aba72b.jpeg',16),(34,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/e0421784-a026-4018-b4d0-cca01590455f.jpeg',16),(35,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/b20dff2e-53bb-4777-b045-6ed85c96b03a.jpeg',16),(36,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/a0c2ffbd-cc84-4c28-bfaa-bd14419fcbb2.jpeg',16),(37,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/a2961505-77c7-4816-85cf-70ba3f2475f2.jpeg',16),(38,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/53b33ed5-e6d2-46e2-86e1-fad705a5d5f2.jpeg',17),(39,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/204f3223-dcf4-400e-bd25-bde51a537c96.jpeg',17),(40,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/19d008ec-bdd0-4be3-a317-8a90ee5575fa.jpeg',17),(41,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/0b22d8b3-c71d-46f8-af78-4176d65c0553.jpeg',17),(42,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/500f18ff-c651-45de-9d06-221b3c9375ac.jpeg',17),(43,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/42fe4e28-bd5a-47ed-993f-f1c13d331095.jpeg',17),(44,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/511b230f-b498-4397-8fbd-82c3a2a4a4fc.jpeg',17),(45,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/4e40533a-6a5e-4a3b-9e1c-229615ce8e9f.jpeg',17),(46,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/f75a0ac6-0013-43c6-8ca3-1dc169a608e9.jpeg',17),(47,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/9ea55c00-0af3-4488-af2c-e11adee3959d.jpeg',18),(48,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/0a712ff4-96c6-4a33-973f-a790e8949e6d.gif',19),(49,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/ec21af93-11bc-4366-9069-b14801523cff.jpg',20),(50,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/3a5cf7ce-9e71-4e83-a6b4-1ccdaeaaf47d.jpg',21),(51,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/a21879c6-4870-4847-8beb-c00e5d0394bd.jpg',22),(52,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/2fc22706-b03b-4566-b268-d337c561e99a.png',23),(53,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/ffc0aa96-7045-483e-908e-3bbe33f4ce9a.png',24),(54,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/8bab772f-9a4a-4e72-b33a-30f2098be891.png',25),(55,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/12a9a689-1651-45ed-9a39-46f11ec0bef9.png',26),(56,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/c5249bf6-04c3-4948-8af1-f293a2f18e7f.avif',27),(57,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/fac5f1e5-3880-4560-b357-e1e5a3323e0e.png',28),(58,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/9ba1fc98-321b-4c84-8888-e4f6d97eae52.png',29),(59,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/5dc61f11-b203-4cc7-a9dd-100ccbde5c25.png',30),(60,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/8100011a-acfa-4153-8c91-a521e5c2a8a5.jpg',31),(61,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/f621e1ea-65f9-4543-966d-3b1539ee5869.png',32),(62,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/95cb7631-a4f8-4a85-9d81-ea9a4089be39.png',33),(63,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/063289f1-f8e8-4823-b155-1dd52b2dbf65.png',34),(64,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/62947264-5bdc-4688-b1cf-17b8eb24dff5.png',35),(65,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/14a43319-effb-47f3-8008-e82851650f0c.png',36),(66,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/a55dd7c6-b608-4bd6-8e12-b593a44ae4c0.png',37),(68,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/cd7e2d2e-ebea-4302-aee1-ed0d0143f738.png',39),(69,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/a728f980-6a3b-4392-8814-56e3d35d3e6d.jpg',40),(70,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/d19e44bd-51d1-4da8-837d-d9ddd4419c3c.png',41),(71,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/2398c026-b07f-419f-b336-2f0ce5d0f6dc.png',42),(72,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/175919f8-13c8-4d96-b964-a8dc50dbc525.png',43),(73,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/0b5da661-11c8-47c5-855c-991048671de8.jpg',44),(74,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/ebf903c3-c0dc-4d74-8658-f79a72e8ecdc.png',45),(75,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/d8d05eac-04d6-4bff-a839-740a16d46ee7.jpg',46),(76,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/1ef4f119-365e-406b-bcb2-282ddfbe0659.png',47),(77,NULL,'https://worqbucket.s3.ap-northeast-2.amazonaws.com/d3aa2f0a-338b-4f22-9c3f-ad8a3b1ef3b7.png',48);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `like_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `channel_info_id` bigint NOT NULL,
  PRIMARY KEY (`like_id`),
  KEY `user_id` (`user_id`),
  KEY `channel_info_id` (`channel_info_id`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`channel_info_id`) REFERENCES `feed` (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,4,1),(2,4,3),(3,4,4),(4,4,2),(5,6,1),(6,3,1),(7,3,2),(8,3,3),(10,3,4),(11,3,5),(12,3,6),(13,3,7),(14,3,8),(15,3,9),(16,3,10),(17,3,11),(18,3,12),(19,3,13),(20,3,14),(22,3,15),(23,3,16),(24,4,5),(25,4,17),(26,4,16);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_government_product`
--

DROP TABLE IF EXISTS `local_government_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local_government_product` (
  `pamphlet_id` bigint NOT NULL AUTO_INCREMENT,
  `pamphlet_sido` char(4) NOT NULL,
  `pamphlet_sigungu` char(4) NOT NULL,
  `pamphlet_name` varchar(30) NOT NULL,
  `pamphlet_url` varchar(100) NOT NULL,
  PRIMARY KEY (`pamphlet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_government_product`
--

LOCK TABLES `local_government_product` WRITE;
/*!40000 ALTER TABLE `local_government_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `local_government_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map`
--

DROP TABLE IF EXISTS `map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map` (
  `pin_id` varchar(255) NOT NULL,
  `cord_x` float NOT NULL,
  `cord_y` float NOT NULL,
  `place_name` varchar(255) DEFAULT NULL,
  `info` varchar(255) NOT NULL,
  `channel_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`pin_id`),
  KEY `channel_id` (`channel_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `map_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`),
  CONSTRAINT `map_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map`
--

LOCK TABLES `map` WRITE;
/*!40000 ALTER TABLE `map` DISABLE KEYS */;
/*!40000 ALTER TABLE `map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_pin`
--

DROP TABLE IF EXISTS `map_pin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_pin` (
  `pin_id` varchar(255) NOT NULL,
  `info` varchar(255) DEFAULT NULL,
  `cord_x` double DEFAULT NULL,
  `cord_y` double DEFAULT NULL,
  `place_name` varchar(255) DEFAULT NULL,
  `channel_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`pin_id`),
  KEY `FKnqmlswmli6o0eiexyfm1nh1hm` (`channel_id`),
  KEY `FKcrq0tenec85g9eal4rttkdt68` (`user_id`),
  CONSTRAINT `FKcrq0tenec85g9eal4rttkdt68` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKnqmlswmli6o0eiexyfm1nh1hm` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_pin`
--

LOCK TABLES `map_pin` WRITE;
/*!40000 ALTER TABLE `map_pin` DISABLE KEYS */;
INSERT INTO `map_pin` VALUES ('0u9Guh1ckNOR_2-3C2eCY','엔젤 모각코',35.17865321794359,126.80770533451431,'엔젤 흑석사거리',11,3),('5z3mw4Mch9stzBOzl9pUM','내일 9시',35.17776775953591,126.80636809203666,'영화',11,4),('BchHMWMvUIXXgUeiXPGi5','선생님입니다.',35.16625946145209,126.81339841341422,'제 학교입니다',10,6),('cmslIU8WFSz9i96KXfjSM','어등뼈 가자요',35.17768539699719,126.80419462657133,'어등뼈',11,2),('e1uzLIYutU6WpzI0axfwk','ㅎㅇㅎㅇ',35.17712561599252,126.80500834157702,'ㅎㅇㅎㅇ',11,7),('KmBTtMCrdfbjnOPz_hMyX','여기서 영화보고 점심',35.170958892501396,126.80976520734103,'점심',11,4),('obHDy4iWOEKVPH8xfmzbU','test',35.17718601294002,126.80333953871619,'testte',11,2),('r009UgJdLmeU8dKg0w9e0','숙소야',35.177959935865395,126.81396449722443,'여기가 숙소',11,4);
/*!40000 ALTER TABLE `map_pin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `place_id` bigint NOT NULL AUTO_INCREMENT,
  `place_name` varchar(20) NOT NULL,
  `place_type` char(4) NOT NULL,
  `place_location` varchar(100) NOT NULL,
  `place_sido` char(4) NOT NULL,
  `place_sigungu` char(4) NOT NULL,
  `place_url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `review_content` varchar(500) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_id` bigint NOT NULL AUTO_INCREMENT,
  `task_content` varchar(100) NOT NULL,
  `task_start_time` varchar(255) NOT NULL,
  `task_end_time` varchar(255) NOT NULL,
  `task_is_finish` tinyint(1) NOT NULL,
  `task_important` enum('LOW','MID','HIGH') DEFAULT NULL,
  `task_type` enum('WORK','REST') NOT NULL,
  `task_worcation_id` bigint NOT NULL,
  `task_title` varchar(100) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `task_worcation_id` (`task_worcation_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`task_worcation_id`) REFERENCES `worcation` (`worcation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'최종 발표 준비','2024-08-15T19:00:00','2024-08-15T22:30:00',0,'HIGH','WORK',3,'발표 준비'),(2,'발표 자료 만들기','2024-08-15T22:30:00','2024-08-16T08:30:00',0,'HIGH','WORK',3,'발표 자료 만들기'),(3,'뭐 먹을까','2024-08-15T19:30:00','2024-08-15T21:00:00',0,'MID','REST',3,'저녁 식사'),(4,'더미 데이터 만들기','2024-08-15T20:00:00','2024-08-15T22:00:00',0,'LOW','WORK',3,'더미 데이터 생성'),(5,'프로젝트 마무리','2024-08-15T13:30:00','2024-08-16T00:00:00',1,'HIGH','WORK',4,'프로젝트 마무리'),(6,'떨린다','2024-08-16T09:00:00','2024-08-16T15:00:00',0,'MID','WORK',3,'최종 발표'),(7,'맛있게 먹자','2024-08-16T12:00:00','2024-08-16T13:30:00',0,'LOW','REST',3,'점심'),(8,'뼈해장국 먹기','2024-08-15T19:00:00','2024-08-15T20:30:00',0,'MID','REST',4,'저녁식사'),(9,'공통 플젝 마무리 회식','2024-08-16T18:30:00','2024-08-16T23:00:00',0,'HIGH','REST',3,'회식'),(10,'PPT 마무리 작업','2024-08-15T21:00:00','2024-08-15T22:30:00',1,'HIGH','WORK',4,'PPT'),(11,'내일 발표 화이팅!!','2024-08-16T09:00:00','2024-08-16T13:00:00',0,'LOW','WORK',4,'발표!!'),(12,'영어공부','2024-08-15T00:23:42','2024-08-15T00:25:00',0,'LOW','WORK',6,'영어공부'),(13,'PPT 만들어야해요','2024-08-15T23:00:00','2024-08-16T18:30:00',0,'LOW','WORK',1,'PPT 만들기'),(14,'발표자료 만들어야 해요','2024-08-15T23:00:00','2024-08-17T00:00:00',0,'HIGH','WORK',1,'발표자료 만들기');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_phone` varchar(255) NOT NULL,
  `user_nickname` varchar(255) NOT NULL,
  `user_report_count` bigint DEFAULT NULL,
  `user_favorite_sido` varchar(255) NOT NULL,
  `user_favorite_sigungu` varchar(255) NOT NULL,
  `user_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'mj1584@naver.com','$2a$10$LwYPhjwK1nCz.0.UfrE7U.YhYdCzx5dZMVYUA.7E9DC2rPJT3a6Tm','01037523630','김민주',0,'광주광역시','동구','https://raw.githubusercontent.com/tailwindlabs/heroicons/56c073c2c9a66d2e51adb93d8e87e2e941d5b6db/src/20/solid/user-circle.svg'),(2,'123@example.com','$2a$10$OF2B.76jDYlbdeFaJ5OcUeksf0gR2weougWTP/MXAKJFQACZJbjj6','01012121212','wava',0,'서울특별시','강남구','https://worqbucket.s3.ap-northeast-2.amazonaws.com/efd2279c-8d0b-47ed-acec-147abfc3efd1.gif'),(3,'wava@wava.com','$2a$10$qgk63Sefr01Kde.XBy2VqeK4cnyd4Lg/unAPzjfReOm2LqzW1tRry','01012341234','진구',0,'서울특별시','강남구','https://worqbucket.s3.ap-northeast-2.amazonaws.com/4baf3411-ad6c-4088-a94d-6cd2148cad19.jpeg'),(4,'ggh2111@naver.com','$2a$10$dechpRS7sG5wQRMhthk2puJwOXePcch0Je8K4eRh9bxL1uagGpqwS','01020760970','지훈입니다',0,'전라북도','전주시','https://worqbucket.s3.ap-northeast-2.amazonaws.com/d3069d73-59bb-440d-9ff6-5db1c18ef8a6.webp'),(5,'evil55@naver.com','$2a$10$355sp7xn69t6WpG.8EguIu7yfocbV/79aQpsaE5fDccOLy4bJ7I8m','01047921820','이병수',0,'광주광역시','광산구','https://raw.githubusercontent.com/tailwindlabs/heroicons/56c073c2c9a66d2e51adb93d8e87e2e941d5b6db/src/20/solid/user-circle.svg'),(6,'myid@my.id','$2a$10$muwKTSW.ShQQOpEHCViosun.H59Fhr1g8mldAlvAuhdEvsPVXV5ci','00000000000','myid',0,'서울특별시','강서구','https://worqbucket.s3.ap-northeast-2.amazonaws.com/0bdbda2a-d42f-4625-b6a0-0f515800aff1.jpg'),(7,'evil555@naver.com','$2a$10$VRwVf8tdFHUAPr0AK5PkG.0quNO64i.O.v3SqyPqEwoZxrauhMc1e','01044131111','evil',0,'광주광역시','광산구','https://worqbucket.s3.ap-northeast-2.amazonaws.com/b733c697-4d3e-4875-9bc9-2c98dd2d8bf4.gif'),(8,'good@go.od','$2a$10$l1OYPRGqaWbFx6iOwwSMt.itsOiozFLBSi6EXWAndEbp.XDJWR6ce','01012344321','good',0,'서울특별시','강동구','https://raw.githubusercontent.com/tailwindlabs/heroicons/56c073c2c9a66d2e51adb93d8e87e2e941d5b6db/src/20/solid/user-circle.svg'),(9,'thisiswava@example.com','$2a$10$ubNAva9RSGSEgvN3cEnVnOsnIuXqWdsb/QtwO4Hk61QNE8DVm42Hi','01012341222','내일하루코딩',0,'서울특별시','강남구','https://raw.githubusercontent.com/tailwindlabs/heroicons/56c073c2c9a66d2e51adb93d8e87e2e941d5b6db/src/20/solid/user-circle.svg'),(10,'a@b.cd','$2a$10$P1exQg2rv/h6qnnif8jzv.LXCuuUJCe5NWvk2xMd9s.f8BvTIm2si','01010101101','abcd',0,'서울특별시','관악구','https://raw.githubusercontent.com/tailwindlabs/heroicons/56c073c2c9a66d2e51adb93d8e87e2e941d5b6db/src/20/solid/user-circle.svg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `roles` varchar(255) DEFAULT NULL,
  `user_user_id` bigint NOT NULL,
  PRIMARY KEY (`user_user_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('VISITOR',1),('VISITOR',2),('VISITOR',3),('VISITOR',4),('VISITOR',5),('VISITOR',6),('VISITOR',7),('VISITOR',8),('VISITOR',9),('VISITOR',10);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worcation`
--

DROP TABLE IF EXISTS `worcation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worcation` (
  `worcation_id` bigint NOT NULL AUTO_INCREMENT,
  `worcation_sido` varchar(255) DEFAULT NULL,
  `worcation_sigungu` varchar(255) DEFAULT NULL,
  `worcation_start_date` datetime(6) DEFAULT NULL,
  `worcation_end_date` datetime(6) DEFAULT NULL,
  `worcation_job` varchar(255) DEFAULT NULL,
  `worcation_type` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`worcation_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `worcation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worcation`
--

LOCK TABLES `worcation` WRITE;
/*!40000 ALTER TABLE `worcation` DISABLE KEYS */;
INSERT INTO `worcation` VALUES (1,'서울특별시','강남구','2024-08-15 18:06:53.609000','2024-08-16 18:06:53.000000','개백수',NULL,2),(2,'광주광역시','북구','2024-08-15 18:07:17.042000','2025-02-13 18:07:17.000000','백엔드 개발자',NULL,1),(3,'전라북도','전주시','2024-08-15 18:07:28.191000','2034-08-15 18:07:28.000000','프리랜서',NULL,4),(4,'서울특별시','강남구','2024-08-15 18:07:28.564000','2024-08-16 18:07:28.000000','Backend Developer',NULL,3),(5,'전라북도','전주시','2024-08-16 18:07:55.000000','2029-08-31 18:07:55.000000','무직',NULL,6),(6,'광주광역시','광산구','2024-08-15 18:09:25.116000','2024-08-23 18:09:25.000000','it',NULL,7),(7,'인천광역시','부평구','2024-08-15 18:43:44.816000','2024-08-31 18:43:44.000000','무직',NULL,8),(8,'광주광역시','광산구','2024-08-15 23:22:46.183000','2030-08-05 23:22:46.000000','무직',NULL,10);
/*!40000 ALTER TABLE `worcation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15 16:30:27
