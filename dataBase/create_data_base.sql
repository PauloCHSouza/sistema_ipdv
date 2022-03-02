-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.49-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para sistema_ipdv
CREATE DATABASE IF NOT EXISTS `sistema_ipdv` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci */;
USE `sistema_ipdv`;

-- Copiando estrutura para tabela sistema_ipdv.fincentrocustos
CREATE TABLE IF NOT EXISTS `fincentrocustos` (
  `idCentroCusto` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  `dtInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dtAlteracao` datetime DEFAULT NULL,
  PRIMARY KEY (`idCentroCusto`),
  UNIQUE KEY `titulo` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_ipdv.usucargos
CREATE TABLE IF NOT EXISTS `usucargos` (
  `idcargo` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  `dtInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dtAlteracao` datetime DEFAULT NULL,
  PRIMARY KEY (`idcargo`),
  UNIQUE KEY `titulo` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_ipdv.usudepartamentos
CREATE TABLE IF NOT EXISTS `usudepartamentos` (
  `idDepartamento` int(11) NOT NULL AUTO_INCREMENT,
  `idCentroCusto` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  `dtInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dtAlteracao` datetime DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`) USING BTREE,
  UNIQUE KEY `titulo` (`titulo`),
  KEY `FK_usudepartamentos_fincentrocustos` (`idCentroCusto`),
  CONSTRAINT `FK_usudepartamentos_fincentrocustos` FOREIGN KEY (`idCentroCusto`) REFERENCES `fincentrocustos` (`idCentroCusto`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_ipdv.usuusuarios
CREATE TABLE IF NOT EXISTS `usuusuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) DEFAULT NULL,
  `idDepartamento` int(11) NOT NULL,
  `idCargo` int(11) NOT NULL,
  `nascimento` date DEFAULT NULL,
  `email` varchar(50) NOT NULL DEFAULT '',
  `senha` varchar(12) NOT NULL,
  `telCelular` varchar(20) DEFAULT NULL,
  `telFixo` varchar(20) DEFAULT NULL,
  `endereco` varchar(50) DEFAULT NULL,
  `numero` varchar(15) DEFAULT NULL,
  `complemento` varchar(25) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  `dtInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dtAlteracao` datetime DEFAULT NULL,
  `estadoCivil` varchar(20) DEFAULT NULL,
  `formacaoAcademica` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`),
  KEY `usuusuarios_idCargo_usucargos_idCargo` (`idCargo`),
  KEY `FK_usuusuarios_usudepartamentos` (`idDepartamento`),
  CONSTRAINT `FK_usuusuarios_usudepartamentos` FOREIGN KEY (`idDepartamento`) REFERENCES `usudepartamentos` (`idDepartamento`),
  CONSTRAINT `usuusuarios_idCargo_usucargos_idCargo` FOREIGN KEY (`idCargo`) REFERENCES `usucargos` (`idcargo`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
