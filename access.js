'use strict';

var casper = require('casper').create();

casper.start('http://' + casper.cli.get(0), function () {
	//this.echo(this.getTitle());
	//this.test.assertExist("div.loginBox", "the login box exists");
	this.fillSelectors('div.loginBox', {
		'input#userName': casper.cli.get(1),
		'input#pcPassword': casper.cli.get(2)
	});

	this.click('label#loginBtn');
	//this.echo("logged in");
});

// helper function
function getChecked(cssSelector) {
	return document.querySelector(cssSelector).checked;
}

casper.withFrame(1, function () {
	this.click('a#a46');
	//this.echo("going to time settings page");
});

casper.withFrame(2, function () {
	switch (casper.cli.get(3)) {
		default:
			if (casper.evaluate(getChecked, 'input[name="enableCtrl"]')) {
				this.echo("disabling security");
			} else {
				this.echo("enabling security");
			}
			this.click('input[name="enableCtrl"]');
			this.click('input[name="save"]');
			break;
		case "enable":
			if (casper.evaluate(getChecked, 'input[name="enableCtrl"]')) {
				this.echo("already enabled");
			} else {
				this.echo("enabling security");
				this.click('input[name="enableCtrl"]');
				this.click('input[name="save"]');
			}
			break;
		case "disable":
			if (casper.evaluate(getChecked, 'input[name="enableCtrl"]')) {
				this.echo("disabling security");
				this.click('input[name="enableCtrl"]');
				this.click('input[name="save"]');
			} else {
				this.echo("already disabled");
			}
			break;

	}

});

casper.withFrame(1, function () {
	this.click('a#a74');
	//this.echo("logging out");
});

casper.run();
