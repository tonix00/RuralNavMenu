
<script type="text/javascript">	

	$('a.subnav-item, a.navbar-item').click(function() {
		if ($.trim($(this).text()) == 'KYC Portal') {
			var formlogin = "${model.loginName}";
			
			//sample link it will be ajax generated			
			window.open("http://210.213.202.59/rnetws-webapp/services/sso/login/" + formlogin + "/RNT16SSOGXI");
		}
		/* else if ($.trim($(this).text()) == 'Book Flights' || prName == 'BKO_BookFlights') {
			var agentCode = $(".user-name").find("p:last").html().trim().replace(/\s/g, '');
			var clientCode = agentCode.substr(0, 3);
			if (clientCode == 'RNT') {}
			else {
				window.open('http://192.168.1.70:8484/ruralnet-v3-main/LoginForm.htm', '_newtab');
				return false;
			}
		} */
		else {
			var prName = $(this).attr('href').split("=")[1];
			
			if (prName.split("_")[0] == 'RNT') {
				if (prName == 'RNT_GovtDocsFormForBanks' || prName == 'RNT_GovtDocsFormForCoops') {
					window.open('https://drive.google.com/file/d/1_BEi8NuoepmzcG6XQ8BGQ0ghVWdmBI1j/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_TP00_Introduction') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8d29FSnZONGg4X3c/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_TP01_OverviewOfServices') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8WkNUMmtpVnBhTlU/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_TP02_FundingSettlement') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8UGtxUjVxT3hXMEE/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_TP03_UsingBayadExpress') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8Sk1OMzNzdDhudEk/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_TP04_UsingCashKOMobile') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8Vkt4YkRZY2d3MEE/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_TP05_TrainingAgents') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8WktZTjdsUDQ4YkU/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_TP06_MarketingOperationsIT') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8UzVGR0xhQ0UyM0U/view?usp=sharing', '_blank');
				}
				else if (prName == 'RNT_CollectionSlipForBanks' || prName == 'RNT_CollectionSlipForCoops') {
					//window.open('https://drive.google.com/file/d/1REyDp2V7FbWZqppqinONt8mp78BdbHfl/view?usp=sharing', '_blank');
					window.open('https://drive.google.com/open?id=1QuINaaIDnkt0hIO-vwEJzFkK1ZjNgnt5', '_blank');
				}
				else if (prName == 'RNT_KYCFormForBanks' || prName == 'RNT_KYCFormForCoops') {
					//window.open('https://drive.google.com/file/d/1W2TlJ2BllGbeqnP1SbvsLm-L-5aY_0gf/view?usp=sharing', '_blank');
					window.open('https://drive.google.com/open?id=1PSIDnshvIVYRWzS3MzMFz0C-Ho3vJxZq', '_blank');
				}
				else if (prName == 'RNT_TrainingMarketingMaterials') {
					window.open('https://drive.google.com/open?id=1hxqqBgm_YdEEIxBlB2oZSiL_MyosNMal', '_blank');
				}
				return false;
			}
			else if (prName.split("_")[0] == 'MKT') {
				if (prName == 'MKT_BEXCounter_8.5x11in') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8RGFqQXp0QzFYQ1E/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_BEXPoster_11x16in_Tagalog') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8TVRqSkhQb2xYR3M/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_BEXPoster_11x16in_Bisaya') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8OGNxeE5PajNfTms/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_BEXTarp_3x5ft_Tagalog') { 
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8U1VGTEtUVzNuNEE/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_BEXTarp_3x5ft_Bisaya') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8SjNRblhWb3BZM1E/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_BEXTarp_2x3ft_Billers') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8dDEtNHZfdnBVSWc/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKOFlyer_5.5x8.5in_Tagalog') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8TUdmbXE2LWVROWM/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKOFlyer_5.5x8.5in_Bisaya') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8UFlyRFVrcnZab00/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKOPoster_11x16in_Tagalog') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8Y2VpdzF6SWVSZTA/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKOPoster_11x16in_Bisaya') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8OVBRNzBWVDRuc1U/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKONegosyo_15x21in_Tagalog') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8UEZhNWllaGVDcUE/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKONegosyo_15x21in_Bisaya') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8a3gtT0dFNVZKdDA/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKOPadala_15x21in_Tagalog') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8VW1kd2twNzBFV1E/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_CKOPadala_15x21in_Bisaya') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8dzl6SGM5SnBlcEU/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_Form_Fees') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8WXprYUE2Qmh5RXM/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_Form_LocalBillers')  {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8TUI5eXdwQ09kT1E/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_Form_NationalBillers') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8T0piMG9oMDNibjQ/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_Form_CashKO_KYC') { 
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8OW0xcjM4M196V2c/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'MKT_Form_CashKO_Merchants') {
					window.open('https://drive.google.com/file/d/0B_jydWTi1Wd8V25IUnZUMXZOR0k/view?usp=sharing', '_blank');
					return false;
				}
			}
			else if (prName.split("_")[0] == 'INS') {
				if (prName == 'INS_CIBQuickGuide') {
					window.open('https://drive.google.com/open?id=13td_iSKIQVFCtw-MlWZxWBTAHFLjFREH', '_blank');
					return false;
				}
				else if (prName == 'INS_CIBBEQuickGuide') {
					window.open('https://drive.google.com/open?id=1eIJ3YetvjwPWRoAVQNdVxfsUL2GfOtmZ', '_blank');
					return false;
				}
				else if (prName == 'INS_MassUploadTemplate') {
					window.open('https://drive.google.com/open?id=1S7SFQt2IfvEPHK9scXI4rFAtNXHQgD4l', '_blank');
					return false;
				}
				else if (prName == 'INS_StandardApplForm') {
					window.open('https://drive.google.com/open?id=1tZTFCbSdEU4x5lflIrGT8L9yy7cXs2pF', '_blank');
					return false;
				}
				else if (prName == 'INS_StandardFamApplForm') {
					window.open('https://drive.google.com/file/d/1O6iS4fkl1oGzbLqnuzONvl18RZBiNIwS/view', '_blank');
					return false;
				}
				else if (prName == 'INS_StandardApplWholeForm') {
					window.open('https://drive.google.com/file/d/1ZOLAXaV1IkhcDWY0MzjLfp8HbTGzz7QM/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'INS_StandardFamApplWholeForm') {
					window.open('https://drive.google.com/file/d/19uuh3UdNEOAiYXJ9WpuWYyyv4lM7iILi/view?usp=sharing', '_blank');
					return false;
				}
				else if (prName == 'INS_MotorshieldApplWholeForm') {
					window.open('https://drive.google.com/file/d/1UQlXbNlfPZT1J0XtcZ3bR1K5fK_XbBJ3/view', '_blank');
					return false;
				}
				else if (prName == 'INS_NegoSeguradoApplForm') {
					window.open('https://drive.google.com/file/d/18XuMD7vFrGTjGD9bY-zKv_5U0Tk7Y0xj/view', '_blank');
					return false;
				}
			}
			/*
			else if (prName == 'RNT_TrainingMarketingMaterials') {
				window.open('https://drive.google.com/open?id=1hxqqBgm_YdEEIxBlB2oZSiL_MyosNMal', '_blank');
				return false;
			}
			*/
			else if (prName.split("_")[0] == 'INC') {
				//GENERALI
				if (prName == 'INC_GenHIBForm') {
					window.open('https://drive.google.com/open?id=1nqFLIPM2R0OWxpqiXabqga9I3zrX3NGU', '_blank');
					return false;
				}
				else if (prName == 'INC_GenDCForm') {
					window.open('https://drive.google.com/open?id=1mGFBUFktuP4yqHK1cCqk5YqHI75RTTLw', '_blank');
					return false;
				}
				else if (prName == 'INC_GenTIForm') {
					window.open('https://drive.google.com/open?id=1QcUx2kX8MkpXhTjbttcwKO2-kwXQxOiE', '_blank');
					return false;
				}
				else if (prName == 'INC_GenAMRForm') {
					window.open('https://drive.google.com/open?id=1ur_zwa7I9dmVcYZocP8UovfoBfdSz3aW', '_blank');
					return false;
				}
				else if (prName == 'INC_GenADForm') {
					window.open('https://drive.google.com/open?id=1sa6EksSUMd3PSSw0k7l3jbgGWBSiP4sj', '_blank');
					return false;
				}
				else if (prName == 'INC_GenDCForm') {
					window.open('https://drive.google.com/open?id=1N5fVMTq4dsZ3iuIXOPQ6McPTG-8zgN4-', '_blank');
					return false;
				}
				//MAAGAP
				else if (prName == 'INC_MaaSCForm') {
					window.open('https://drive.google.com/open?id=1kzQTcpM0lAW-w9DrUEXiTzhR-aMWszrL', '_blank');
					return false;
				}
				//PHILCARE
				else if (prName == 'INC_PCIReimbursementForm') {
					window.open('https://drive.google.com/open?id=1xwxY-T9b2DMUS3E8tEdwj-Yk5oVTSmn1', '_blank');
					return false;
				}
				//COCOLIFE
				else if (prName == 'INC_CLIPhysicianCert') {
					window.open('https://drive.google.com/open?id=17-FFVp-Kw8ccGNEWWmmQQfQllZNnVs03', '_blank');
					return false;
				}
				else if (prName == 'INC_CLIHospitalizationProof') {
					window.open('https://drive.google.com/open?id=1TJP5okyMj73S2-8fN8KdhQLgpsrl_vqj', '_blank');
					return false;
				}
				else if (prName == 'INC_CLIInsStmtDCForm') {
					window.open('https://drive.google.com/open?id=1Lc7KCUQZZJ-hK5Zf6i_8fSBNbkvAi03_', '_blank');
					return false;
				}
				else if (prName == 'INC_CLIClaimantCert') {
					window.open('https://drive.google.com/open?id=1bvZbZA4Co0UhGpo-4PyKShjuvxKD4LKK', '_blank');
					return false;
				}
				else if (prName == 'INC_CLIPhyStmtDCForm') {
					window.open('https://drive.google.com/open?id=124Y0ZQUXrZvi--3uAqtW-80RSlsxt9_W', '_blank');
					return false;
				}
				//PBAC
				else if (prName == 'INC_PBACClaimsCertForm') {
					window.open('https://drive.google.com/file/d/1Orj__JNAq_v_5nEEuv0n-hPKIwKStzpK/view?usp=sharing', '_blank');
					return false;
				}
				//FORTUNE LIFE
				/*
				//else if (prName == 'INC_FLIInsStmtDCForm') {
				else if (prName == 'INC_FLIInsStmtAMR') {
					//window.open('https://drive.google.com/open?id=1wGIX2LiySImmRy9ShfaDE0o1KumUeC3g', '_blank');
					window.open('https://drive.google.com/file/d/1yX9lzaBqtTg_MDHZPcn2SqWMDc-74O7p/view?usp=sharing', '_blank');
					return false;
				}
				//else if (prName == 'INC_FLIPhyStmtDCForm') {
				else if (prName == 'INC_FLIPhyStmtAMR') {
					//window.open('https://drive.google.com/open?id=1RADJ6kvhmyOrIvPkHL_zcYZS-9pkubb7', '_blank');
					window.open('https://drive.google.com/file/d/175IJ8i0rkWDy0Q8HdELdpvwo1EhoLBdB/view?usp=sharing', '_blank');
					return false;
				}
				//else if (prName == 'INC_FLIClaimantsStatement') {
				else if (prName == 'INC_FLIClaimantsStmtDC') {
					//window.open('https://drive.google.com/file/d/1ZX4p0lQlokqOX7QSkey6aa-8S5TO13Mg/view?usp=sharing', '_blank');
					window.open('https://drive.google.com/file/d/1QFV6nUJmNCSXO9FKIIfTaYT3qBDDlBlX/view?usp=sharing', '_blank');
					return false;
				}
				//else if (prName == 'INC_FLIPhyStmtDCForm') {
				else if (prName == 'INC_FLIPhyStmtDC') {
					//window.open('https://drive.google.com/file/d/1hWDi_goQhdhE8yxKoXTFCYjdWhi1RaYf/view', '_blank');
					window.open('https://drive.google.com/file/d/1eoCKFxDKFnWYl6cRdEAQDFeVTutugSIO/view?usp=sharing', '_blank');
					return false;
				}
				*/
			}
			else if (prName.split("_")[0] == 'FRM') {
				var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
				var formsDirPath = contextPath + "/data/forms/";
				var dlFileName = "";
				
				//FORTUNE LIFE
				if (prName == 'FRM_FLICertAuth') {
					dlFileName = "FLI-CERTIFICATE-OF-AUTHORIZATION.pdf";
				}
				else if (prName == 'FRM_FLIClmtStmtTI') {
					dlFileName = "FLI-CLAIMANTS-STATEMENT-TERMINAL-ILLNESS.pdf";
				}
				else if (prName == 'FRM_FLIPhyStmtTI') {
					dlFileName = "FLI-PHYSICIANS-STATEMENT-TERMINAL-ILLNESS.pdf";
				}
				else if (prName == 'FRM_FLIPhyStmtDC') {
					dlFileName = "FLI-PHYSICIANS-STATEMENT-DEATH-CLAIMS.pdf";
				}
				//UPDATED FROM INC TO FRM
				else if (prName == 'FRM_FLIInsStmtAMR') {
					dlFileName = "FLI-INSUREDS-STATEMENT-AMR.pdf";
				}
				else if (prName == 'FRM_FLIPhyStmtAMR') {
					dlFileName = "FLI-PHYSICIANS-STATEMENT-AMR.pdf";
				}
				else if (prName == 'FRM_FLIClaimantsStmtDC') {
					dlFileName = "FLI-CLAIMANTS-STATEMENT-DEATH-CLAIM.pdf";
				}
				//NEWLY ADDED 9/14/2023
				else if (prName == 'FRM_FLICoAHIB') {
					dlFileName = "FLI-COA-HIB.pdf";
				}
				else if (prName == 'FRM_FLIInsStmtTI') {
					dlFileName = "FLI-INSUREDS-STATEMENT-TERMINAL-ILLNESS.pdf";
				}
				else if (prName == 'FRM_FLISickQuestHIB') {
					dlFileName = "FLI-SICKNESS-QUESTIONNAIRE-HIB.pdf";
				}
				//1CISP
				else if (prName == 'FRM_1COAttPhyStmt') {
					dlFileName = "1CISP-ATTENDING-PHYSICIANS-STATEMENT.pdf";
				}
				else if (prName == 'FRM_1COClmtStmt') {
					dlFileName = "1CISP-CLAIMANTS-STATEMENT-FORM.pdf";
				}
				
				var downloadUrl = formsDirPath + dlFileName;
				window.open(downloadUrl, '_blank');
				return false;
			}
		}
	});
	
</script>
