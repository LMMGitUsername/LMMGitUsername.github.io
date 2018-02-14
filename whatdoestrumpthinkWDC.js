(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Quote",
            alias: "Quote",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "whatDoesTrumpThinkData",
            alias: "All Trump quotes from whatdoestrumpthink.com",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://api.whatdoestrumpthink.com/api/v1/quotes/", function(resp, status) {
            var feat = resp.messages.non_personalized,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
					"ID": i,
                    "Quote": feat[i]
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "whatdoestrumpthink";
            tableau.submit();
        });
    });
})();