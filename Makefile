re_deploy:
	fab -i nghibui.pem -H ubuntu@52.10.78.152 -u ubuntu -p rootroot stop_all_pm2_process
	# fab -i nghibui.pem -H ubuntu@52.10.78.152 -u ubuntu -p rootroot run_app
