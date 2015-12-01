(function(exports) {
	exports.exec_cmd = function (cmd, cmd_args) {
		pid = [[NSProcessInfo processInfo] processIdentifier];
		pipe = [NSPipe pipe];
		file = pipe.fileHandleForReading;

		task = [[NSTask alloc] init];
		task.launchPath = cmd;
		task.arguments = cmd_args;
		task.standardOutput = pipe;

	    file = [pipe fileHandleForReading];

	    [task launch];

	    data = [file readDataToEndOfFile];

	    string = [[NSString alloc] initWithData: data encoding: 4];

	    return string;
	};

	exports.touch_view = function(view) {
		xy = [view convertPoint:[view bounds].origin toView: nil];

		exports.exec_cmd("/usr/bin/stouch", ["touch", "" + xy.x, "" + xy.y]);

		return xy;
	};

})(exports);

