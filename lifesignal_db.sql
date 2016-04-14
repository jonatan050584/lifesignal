/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : lifesignal_db

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-04-14 14:35:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for grupo
-- ----------------------------
DROP TABLE IF EXISTS `grupo`;
CREATE TABLE `grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `creacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of grupo
-- ----------------------------
INSERT INTO `grupo` VALUES ('1', 'Familia', '2016-04-14 04:32:44');
INSERT INTO `grupo` VALUES ('2', 'Barrio', '2016-04-14 04:33:12');
INSERT INTO `grupo` VALUES ('3', 'Trabajo', '2016-04-14 04:33:26');
INSERT INTO `grupo` VALUES ('6', 'Familia', '2016-04-14 16:43:37');
INSERT INTO `grupo` VALUES ('7', 'Trabajo', '2016-04-14 16:44:16');

-- ----------------------------
-- Table structure for grupo_usuario
-- ----------------------------
DROP TABLE IF EXISTS `grupo_usuario`;
CREATE TABLE `grupo_usuario` (
  `grupo_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `creador` int(11) DEFAULT NULL,
  PRIMARY KEY (`grupo_id`,`usuario_id`),
  KEY `fk_grupo_has_usuario_usuario1_idx` (`usuario_id`),
  KEY `fk_grupo_has_usuario_grupo1_idx` (`grupo_id`),
  CONSTRAINT `fk_grupo_has_usuario_grupo1` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_grupo_has_usuario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of grupo_usuario
-- ----------------------------
INSERT INTO `grupo_usuario` VALUES ('1', '1', '1');
INSERT INTO `grupo_usuario` VALUES ('2', '1', '0');
INSERT INTO `grupo_usuario` VALUES ('2', '2', '1');
INSERT INTO `grupo_usuario` VALUES ('3', '1', '1');
INSERT INTO `grupo_usuario` VALUES ('6', '2', '1');
INSERT INTO `grupo_usuario` VALUES ('7', '2', '1');

-- ----------------------------
-- Table structure for invitacion
-- ----------------------------
DROP TABLE IF EXISTS `invitacion`;
CREATE TABLE `invitacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `creacion` datetime DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invitacion_usuario1_idx` (`usuario_id`),
  KEY `fk_invitacion_grupo1_idx` (`grupo_id`),
  CONSTRAINT `fk_invitacion_grupo1` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_invitacion_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of invitacion
-- ----------------------------

-- ----------------------------
-- Table structure for mensaje
-- ----------------------------
DROP TABLE IF EXISTS `mensaje`;
CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `texto` text,
  `creacion` datetime DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mensaje_usuario1_idx` (`usuario_id`),
  KEY `fk_mensaje_grupo1_idx` (`grupo_id`),
  CONSTRAINT `fk_mensaje_grupo1` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensaje_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mensaje
-- ----------------------------

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `clave` varchar(20) DEFAULT NULL,
  `fbid` varchar(45) DEFAULT NULL,
  `creacion` datetime DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `estado` int(11) DEFAULT '1',
  `pic` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `fbid_UNIQUE` (`fbid`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES ('1', 'Jonatán', 'López', 'jonatan_angelo@otmail.com', '', '1020881981', '2016-04-14 10:38:31', '980080326', '1', 'https://scontent.xx.fbcdn.net/hprofile-xlp1/v/t1.0-1/p200x200/10689853_10207603635630231_8039168065129667660_n.jpg?oh=702eeef80ec3817034600ca234edec6e&oe=57ACB953');
INSERT INTO `usuario` VALUES ('2', 'Jonatán', 'López', 'jonatan_angelo@hotmail.com', '', '10208819811073857', '2016-04-14 10:24:05', '980080329', '1', 'https://scontent.xx.fbcdn.net/hprofile-xlp1/v/t1.0-1/p200x200/10689853_10207603635630231_8039168065129667660_n.jpg?oh=702eeef80ec3817034600ca234edec6e&oe=57ACB953');
